---
layout: default
---
<section class="demo">
  <div class="wrapper">
    <h2>Play with Yorkie!</h2>
    <h3>CodeMirror</h3>
    <p>The CodeMirror example uses custom CRDT type, <a href="/docs/master/js-sdk#text">Text</a>.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/master/dist/index.html">codemirror.html</a></p>
    <div class="text">
      <textarea id="text-editor">Type text here</textarea>
    </div>
    <h3>Drawing</h3>
    <p>The drawing example uses Array.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/master/dist/drawing.html">drawing.html</a></p>
    <div class="drawing">
      <canvas id="drawing-panel" width="480px" height="300px"></canvas>
    </div>
    <h3>Simple Kanban board</h3>
    <p>Using Vue.js</p>
    <div class="kanban" id="kanban-board">
{% raw %}
      <div v-cloak class="list" v-for="(list, listIdx) in lists">
        <span class="delete" v-on:click="deleteList(listIdx)">❌</span>
        <div class="title">{{ list.title }}</div>
        <div class="card" v-for="(card, cardIdx) in list.cards">
          <span class="delete" v-on:click="deleteCard(list, cardIdx)">❌</span>
          {{ card }}
        </div>
        <div class="add-card" v-on:click="addCard(list)">Add another card</div>
      </div>
      <div class="add-list" v-on:click="addList">Add another list</div>
{% endraw %}
    </div>
  </div>
</section>
<script src="/static/js/demo-util.js"></script>
<script src="/static/js/demo-codemirror.js"></script>
<script src="/static/js/demo-drawing.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/static/js/demo-kanban.js"></script>

<script>
  const placeholder = document.getElementById('text-editor');
  const drawingPanel = document.getElementById('drawing-panel');
  const kanbanBoard = document.getElementById('kanban-board');

  async function main() {
    try {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = yorkie.createClient('http://localhost:8080');
      await client.activate();

      await createTextExample(client, placeholder);
      await createDrawingExample(client, drawingPanel);
      await createKanbanExample(client, kanbanBoard);
    } catch (e) {
      console.error(e);
    }
  }

  main();
</script>
