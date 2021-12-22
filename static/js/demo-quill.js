function toDelta(doc) {
  const root = doc.getRoot();
  const deltas = [];
  for (const val of root.quill.getValue()) {
    deltas.push({
      insert: val.content,
      attributes: val.attributes,
    });
  }
  return deltas;
}

function toAttributes(attrs) {
  if (!attrs) {
    return attrs;
  }

  const attributes = {};
  for (const [k, v] of Object.entries(attrs)) {
    attributes[k] = v ? String(v) : null;
  }
  return attributes;
}

async function createQuillExample(client, doc, quillHolder) {
  try {
    doc.update((root) => {
      if (!root.quill) {
        const text = root.createRichText('quill');
        text.edit(0, 0, 'Hello Quill');
        text.setStyle(0, 5, {
          bold: '1'
        });
      }
    }, 'create quill if not exists');
    await client.sync();

    // 02. create an instance of Quill
    Quill.register('modules/cursors', QuillCursors);
    const quill = new Quill(quillHolder, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ],
        cursors: true
      },
      theme: 'snow'
    });

    // 03. bind the document with the Quill.
    // 03-1. Quill to Document.
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'yorkie' || !delta.ops) {
        return;
      }

      let from = 0, to = 0;
      console.log(`%c quill: ${JSON.stringify(delta.ops)}`, 'color: green');
      for (const op of delta.ops) {
        if (op.attributes !== undefined || op.insert !== undefined) {
          if (op.retain !== undefined) {
            to = from + op.retain;
          }
          console.log(
            `%c local: ${from}-${to}: ${op.insert} ${op.attributes ? JSON.stringify(op.attributes) : '{}'}`,
            'color: green'
          );

          doc.update((root) => {
            if (op.attributes !== undefined && op.insert === undefined) {
              root.quill.setStyle(from, to, toAttributes(op.attributes));
            } else if (op.insert !== undefined) {
              if (to < from) {
                to = from;
              }
              root.quill.edit(from, to, op.insert, toAttributes(op.attributes));
              from = to + op.insert.length;
            }
          }, `update style by ${client.getID()}`);
        } else if (op.delete !== undefined) {
          if (op.delete !== undefined) {
            to = from + op.delete;
          }
          console.log(`%c local: ${from}-${to}: ''`, 'color: green');

          doc.update((root) => {
            root.quill.edit(from, to, '');
          }, `update quill by ${client.getID()}`);
        } else if (op.retain !== undefined) {
          from = to + op.retain;
          to = from;
        }
      }
    }).on('selection-change', (range, oldRange, source) => {
      if (source === 'yorkie' || source === 'api' || !range) {
        return;
      }

      doc.update((root) => {
        root.quill.select(range.index, range.index + range.length);
      }, `select by ${client.getID()}`);
    });

    // 03-2. document to codemirror(remote).
    const text = doc.getRoot().quill;
    text.onChanges((changes) => {
      const delta = [];
      let prevTo = 0;
      for (const change of changes) {
        const actor = change.actor;
        if (actor === client.getID()) {
          continue;
        }

        const from = change.from;
        const to = change.to;
        const retainFrom = from - prevTo;
        const retainTo = to - from;
        if (change.type === 'content') {
          const content = change.content || '';
          console.log(
            `%c remote: ${from}-${to}: ${content}`,
            'color: skyblue'
          );

          if (retainFrom) {
            delta.push({ retain: retainFrom });
          }
          if (retainTo) {
            delta.push({ delete: retainTo });
          }
          if (content) {
            const op = { insert: content };
            if (change.attributes) {
              op.attributes = change.attributes;
            }
            delta.push(op);
          }
        } else if (change.type === 'style') {
          console.log(
            `%c remote: ${from}-${to}: ${JSON.stringify(change.attributes)}`,
            'color: skyblue'
          );

          if (retainFrom) {
            delta.push({ retain: retainFrom });
          }
          if (change.attributes) {
            const op = { attributes: change.attributes };
            if (retainTo) {
              op.retain = retainTo;
            }

            delta.push(op);
          }
        } else if (change.type === 'selection') {
          const cursors = quill.getModule('cursors');
          cursors.createCursor(actor, actor, colors[0]);
          cursors.moveCursor(actor, {
            index: from,
            length: retainTo
          });
        }

        prevTo = to;
      }

      if (delta.length) {
        console.log(`%c to quill: ${JSON.stringify(delta)}`, 'color: green');
        quill.updateContents(delta, 'yorkie');
      }
    });

    // 04. set initial value.
    quill.setContents({
      ops: toDelta(doc)
    }, 'yorkie');
  } catch (e) {
    console.error(e);
  }
}
