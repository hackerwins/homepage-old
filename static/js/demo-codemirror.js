const colors = ['#FECEEA', '#FEF1D2', '#A9FDD8', '#D7F8FF', '#CEC5FA'];
let nextColorIdx = 0;

// https://github.com/codemirror/CodeMirror/pull/5619
function replaceRangeFix(cm, text, from, to, origin) {
  const adjust = cm.listSelections().findIndex(({anchor, head}) => {
    return CodeMirror.cmpPos(anchor, head) === 0 && CodeMirror.cmpPos(anchor, from) === 0;
  });
  cm.operation(() => {
    cm.replaceRange(text, from, to, origin);
    if (adjust > -1) {
      const range = cm.listSelections()[adjust];
      if (range && CodeMirror.cmpPos(range.head, CodeMirror.changeEnd({from, to, text})) === 0) {
        const ranges = cm.listSelections().slice();
        ranges[adjust] = {anchor: from, head: from};
        cm.setSelections(ranges);
      }
    }
  });
}

function displayRemoteSelection(cm, change, selectionMap) {
  let color;
  if (selectionMap.has(change.actor)) {
    const selection = selectionMap.get(change.actor);
    color = selection.color;
    selection.marker.clear();
  } else {
    color = colors[nextColorIdx];
    nextColorIdx = (nextColorIdx + 1) % colors.length;
  }

  if (change.from === change.to) {
    const pos = cm.posFromIndex(change.from);
    const cursorCoords = cm.cursorCoords(pos);
    const cursorElement = document.createElement('span');
    cursorElement.style.borderLeftWidth = '2px';
    cursorElement.style.borderLeftStyle = 'solid';
    cursorElement.style.borderLeftColor = color;
    cursorElement.style.marginLeft = cursorElement.style.marginRight = '-1px';
    cursorElement.style.height = (cursorCoords.bottom - cursorCoords.top) * 0.9 + 'px';
    cursorElement.setAttribute('data-actor-id', change.actor);
    cursorElement.style.zIndex = 0;

    selectionMap.set(change.actor, {
      color: color,
      marker: cm.setBookmark(pos, {
        widget: cursorElement,
        insertLeft: true
      })
    });
  } else {
    const fromPos = cm.posFromIndex(Math.min(change.from, change.to));
    const toPos = cm.posFromIndex(Math.max(change.from, change.to));

    selectionMap.set(change.actor, {
      color: color,
      marker: cm.markText(fromPos, toPos, {
        css: `background: ${color}`,
        insertLeft: true
      })
    });
  }
}

const selectionMap = new Map();
async function createTextExample(client, doc, placeholder) {
  doc.update((root) => {
    if (!root.codemirror) {
      root.codemirror = new yorkie.Text();
      root.codemirror.edit(0, 0, '<html>\n  <body>Hello CodeMirror</body>\n</html>');
    }
  }, 'create codemirror if not exists');
  await client.sync();

  // 02. create an instance of codemirror.
  const codemirror = CodeMirror.fromTextArea(placeholder, {
    lineNumbers: true
  });

  // 03. bind the document with the codemirror.
  // 03-1. codemirror to document(local).
  codemirror.on('beforeChange', (cm, change) => {
    if (change.origin === 'yorkie' || change.origin === 'setValue') {
      return;
    }

    const from = cm.indexFromPos(change.from);
    const to = cm.indexFromPos(change.to);
    const content = change.text.join('\n');

    doc.update((root) => {
      root.codemirror.edit(from, to, content);
    }, `update codemirror by ${client.getID()}`);

    console.log(`%c local: ${from}-${to}: ${content}`, 'color: green');
  });
  codemirror.on('beforeSelectionChange', (cm, change) => {
    // Fix concurrent issue.
    // CAUTION: The following conditional statement ignores cursor changes
    //          that occur while applying remote changes to CodeMirror
    //          and handles only movement by keyboard and mouse.
    if (!change.origin) {
      return;
    }

    const from = cm.indexFromPos(change.ranges[0].anchor);
    const to = cm.indexFromPos(change.ranges[0].head);

    doc.update((root) => {
      root.codemirror.select(from, to);
    }, `select by ${client.getID()}`);
  });

  // 03-2. document to codemirror(remote).
  const text = doc.getRoot().codemirror;
  text.onChanges((changes) => {
    for (const change of changes) {
      if (change.type === 'content') {
        const actor = change.actor;
        const from = change.from;
        const to = change.to;
        const content = change.content || '';

        if (actor !== client.getID()) {
          console.log(`%c remote: ${from}-${to}: ${content}`, 'color: skyblue');
          const fromIdx = codemirror.posFromIndex(from);
          const toIdx = codemirror.posFromIndex(to);
          replaceRangeFix(codemirror, content, fromIdx, toIdx, 'yorkie');
        }
      } else if (change.type === 'selection') {
        const actor = change.actor;
        if (actor !== client.getID()) {
          displayRemoteSelection(codemirror, change, selectionMap);
        }
      }
    }
  });

  // 04. set initial value.
  codemirror.setValue(text.toString());
}
