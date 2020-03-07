---
layout: default
---
<section class="example">
  <div class="wrapper">
    <h2>Play with Yorkie!</h2>
    <h3>CodeMirror</h3>
    <p>The CodeMirror example uses custom CRDT type, <a href="/docs/master/js-sdk#text">Text</a>.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/master/dist/index.html">codemirror.html</a></p>
    <div class="playground">
      <textarea id="text-editor">Type text here</textarea>
    </div>
    <h3>Drawing</h3>
    <p>The drawing example uses Array.</p>
    <p>For more details: <a href="https://github.com/yorkie-team/yorkie-js-sdk/blob/master/dist/drawing.html">drawing.html</a></p>
    <div class="drawing">
      <canvas id="drawing-panel" width="480px" height="300px"></canvas>
    </div>
  </div>
</section>
<script src="/demo-codemirror.js"></script>
<script src="/demo-drawing.js"></script>

<script>
  const placeholder = document.getElementById('text-editor');
  const drawingPanel = document.getElementById('drawing-panel');

  async function main() {
    try {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = yorkie.createClient('/api');
      await client.activate();

      await createTextExample(client, placeholder);
      await createDrawingExample(client, drawingPanel);
    } catch (e) {
      console.error(e);
    }
  }

  main();
</script>
