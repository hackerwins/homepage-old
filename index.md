---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<section class="heading">
  <div class="wrapper">
    <img class="logo" src="./images/yorkie-photo.png" alt="A photo of Yorkie" />
    <div class="title">
      <h1>Yorkie</h1>
      <h2>Production-grade framework for building collaborative editing applications.</h2>
    </div>
  </div>
  <div class="clear"></div>
</section>
<section class="description">
  <div class="wrapper">
    <p>
      Technology for real-time collaborative editing has been developed and serviced by large companies for a long time. However, no reliable framework is available to the public for production usage. Most of them are specialized for academic uses or implemented for internal services only.
    </p>
    <p>
      <span class="brand">Yorkie</span> provides a reliable framework that can be used for services that handles
heavy traffic.
    </p>
  </div>
</section>
<section class="content">
  <div class="wrapper">
    <h2>
    Yorkie does
    </h2>
    <ul>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Real world modeling</h3>
            <h4>Client-Server vs Peer-to-peer</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/network.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            Peer-to-peer systems can be deployed without any concerns but also need a lot of tedious work to adopt it to the production-level services. <span class="brand">Yorkie</span> provides the SDK, Server, and Database to eliminate the tedious work, can be operational and can use the services just out-of-box. Yorkie will take care of the collaborative features while you focus on your direct services.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Secure</h3>
            <h4>TLS with optional client authentication</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/secure.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <span class="brand">Yorkie</span> uses <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">TLS</a> between clients and server communication. You can connect custom authentication systems with <span class="brand">Yorkie</span> via authentication hooks.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Proofed reliability</h3>
            <h4>CRDT is better than OT</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/reliability.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <a href="https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type">CRDT</a>(Conflict-free Replicated Data Type) is formed solid and clean architecture, much better than <a href="https://en.wikipedia.org/wiki/Operational_transformation">OT</a>(Operational Transformation). Complexity leads to higher probability of bugs on operations. It has been known that some OT algorithms are more complex than CRDT and cannot satisfy the convergence after publication. which would be difficult to use. <span class="brand">Yorkie</span> uses well-proven CRDT algorithm to achieve reliable services for customers.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Size matters</h3>
            <h4>Lamport timestamp vs Vector clock</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/size.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            CRDT uses logical clock to sync documents between each client. <a href="https://en.wikipedia.org/wiki/Vector_clock">Vector clock</a> needs clocks per every client and it leads to large space for snapshots. <span class="brand">Yorkie</span> uses <a href="https://en.wikipedia.org/wiki/Lamport_timestamps">Lamport timestamp</a> to keep smaller document sizes. Lamport clocks cannot distinguish the concurrency and causality relations but in the server-client architecture, we only need to determine the total order within the system - therefore, there are no problems on implementing the real world application.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Easy integration</h3>
            <h4>Builtin JSON-like document</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/easy.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            Some open source CRDT libraries only support basic datatypes. It's very difficult to express complex models of the application only with basic datatypes. <span class="brand">Yorkie</span> provides a general purpose JSON-like documents to unleash the limitation.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Manageable warehouse</h3>
            <h4>Support MongoDB Query</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/warehouse.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <span class="brand">Yorkie</span> snapshots are stored as plain documents in MongoDB collections. You can use enormous MongoDB queries and features to browse stored documents and supervise data warehouse easily with MongoDB management services.
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>
<section class="example">
  <div class="wrapper">
    <h2>Play with Yorkie!</h2>
    <div class="playground">
      <textarea id="clientA">Type text here</textarea>
      <textarea id="clientB" style="display:none">And text goes on</textarea>
    </div>
  </div>
</section>
<section class="contact">
  <div class="wrapper">
    <h2>Contact</h2>
    <p>
      <a href="mailto:susukang98@gmail.com">
        susukang98 at gmail dot com
      </a>
    </p>
  </div>
</section>
<script>
  const colors = ['#FECEEA', '#FEF1D2', '#A9FDD8', '#D7F8FF', '#CEC5FA'];
  let nextColorIdx = 0;

  const placeholder = document.getElementById('clientA');
  const selectionMap = new Map();

  function getYYYYMMDD() {
    const now = new Date();
    return`${now.getUTCFullYear()}${('0' + (now.getUTCMonth() + 1)).slice(-2)}${('0' + now.getUTCDate()).slice(-2)}`;
  }

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

  function displayRemoteSelection(cm, change) {
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

  async function main() {
    try {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = yorkie.createClient('/api');
      await client.activate();

      // 02. create a document then attach it into the client.
      const doc = yorkie.createDocument('examples', `codemirror-${getYYYYMMDD()}`);
      await client.attach(doc);

      doc.update((root) => {
        root.getOrCreateText('content');
      }, 'create content');
      await client.sync();

      // 03. create an instance of codemirror.
      const codemirror = CodeMirror.fromTextArea(placeholder, {
        lineNumbers: true
      });

      // 04. bind the document with the codemirror.
      // 04-1. codemirror to document(local).
      codemirror.on('beforeChange', (cm, change) => {
        if (change.origin === 'yorkie' || change.origin === 'setValue') {
          return;
        }

        const from = cm.indexFromPos(change.from);
        const to = cm.indexFromPos(change.to);
        const content = change.text.join('\n');

        doc.update((root) => {
          const text = root.getOrCreateText('content');
          text.edit(from, to, content);
        }, `update content by ${client.getID()}`);

        console.log(`%c local: ${from}-${to}: ${content}`, 'color: green');
      });
      codemirror.on('beforeSelectionChange', (cm, change) => {
        // Fix concurrent issue.
        // CAUSION: The following conditional statement ignores cursor changes
        //          that occur while applying remote changes to CodeMirror
        //          and handles only movement by keyboard and mouse.
        if (!change.origin) {
          return;
        }

        const from = cm.indexFromPos(change.ranges[0].anchor);
        const to = cm.indexFromPos(change.ranges[0].head);

        doc.update((root) => {
          const text = root.getOrCreateText('content');
          text.updateSelection(from, to);
        }, `update selection by ${client.getID()}`);
      });

      // 04-2. document to codemirror(remote).
      const text = doc.getRootObject().get('content');
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
              displayRemoteSelection(codemirror, change);
            }
          }
        }
      });

      // 05. set initial value.
      codemirror.setValue(text.getValue());
    } catch (e) {
      console.error(e);
    }
  }

  main();
</script>
