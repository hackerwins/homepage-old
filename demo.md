---
layout: default
---
<section class="demo">
  <div class="wrapper">
    <h2>Play with Yorkie!</h2>
    <h3>CodeMirror</h3>
    <p>The CodeMirror example uses custom CRDT type, <a href="/docs/main/js-sdk#text">Text</a>.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/main/examples/index.html">codemirror.html</a></p>
    <div class="text">
      <textarea id="text-editor">Type text here</textarea>
    </div>
    <h3>Markdown</h3>
    <p>Markdown example also uses <a href="/docs/main/js-sdk#text">Text</a>.</p>
    <div class="markdown">
      <textarea id="markdown-editor">Type markdown here</textarea>
    </div>
    <h3>Quill</h3>
    <p>The Quill example uses custom CRDT type, RichText.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/main/examples/quill.html">quill.html</a></p>
    <div>
      <div id="quill-editor"></div>
    </div>
    <h3>Drawing</h3>
    <p>The drawing example uses Array.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/main/examples/drawing.html">drawing.html</a></p>
    <div class="drawing">
      <canvas id="drawing-panel" width="480px" height="300px"></canvas>
    </div>
    <h3>Simple Kanban board</h3>
    <p>Using Vue.js</p>
    <div class="kanban" id="kanban-board">
{% raw %}
      <div v-cloak class="list" v-for="list in lists">
        <span class="delete" v-on:click="deleteList(list)">❌</span>
        <div class="title">{{ list.title }}</div>
        <div class="card" v-for="card in list.cards">
          <span class="delete" v-on:click="deleteCard(list, card)">❌</span>
          {{ card.title }}
        </div>
        <div class="add-card">
          <div v-if="isOpened(list.getID())" class="add-form">
            <input type="text" v-model="title" v-on:keyup.enter="addCard(list)" placeholder="Enter card title" autofocus>
            <div class="buttons">
              <input type="button" value="Add" v-on:click="addCard(list)">
              <input type="button" value="Close" class="pull-right" v-on:click="closeForm(list)">
            </div>
          </div>
          <div v-else class="add-card-opener" v-on:click="openForm(list.getID(), $event)">Add another card</div>
        </div>
      </div>
      <div class="add-list">
        <div v-if="isOpened(0)" class="add-form">
          <input type="text" v-model="title" v-on:keyup.enter="addList()" placeholder="Enter list title" autofocus>
          <div class="buttons">
            <input type="button" value="Add" v-on:click="addList()">
            <input type="button" value="Close" class="pull-right" v-on:click="closeForm()">
          </div>
        </div>
        <div v-else class="add-list-opener" v-on:click="openForm(0, $event)">Add another list</div>
      </div>
{% endraw %}
    </div>
  </div>
</section>
<script src="/static/js/demo-util.js"></script>
<script src="/static/js/demo-codemirror.js"></script>
<script src="/static/js/demo-markdown.js"></script>
<script src="/static/js/demo-quill.js"></script>
<script src="/static/js/demo-drawing.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/static/js/demo-kanban.js"></script>

<script>
  const placeholder = document.getElementById('text-editor');
  const markdownPlaceholder = document.getElementById('markdown-editor');
  const drawingPanel = document.getElementById('drawing-panel');
  const kanbanBoard = document.getElementById('kanban-board');
  const quillEditor = document.getElementById('quill-editor');

  async function main() {
    try {
      {% if jekyll.environment == "production" %}
      // Production build uses https://yorkie.dev/api
      const client = yorkie.createClient('/api');
      {% else %}
      // yorkie-js-sdk serves its envoy endpoint as localhost:8080
      const client = yorkie.createClient('http://localhost:8080');
      {% endif %}
      await client.activate();

      await createTextExample(client, placeholder);
      await createMarkdownExample(client, markdownPlaceholder);
      await createQuillExample(client, quillEditor);
      await createDrawingExample(client, drawingPanel);
      await createKanbanExample(client, kanbanBoard);
    } catch (e) {
      console.error(e);
    }
  }

  main();
</script>
