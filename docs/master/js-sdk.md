---
layout: docs
---

## JS SDK

### Getting started

#### Installation

Include the following code in the `<head>` tag of your HTML:
```
<!-- include yorkie js-->
<script src="yorkie.js"></script>
```

#### How to use

First, create client with RPCAddr(envoy) then activate it.
```javascript
const client = yorkie.createClient('/api');
await client.activate();
```

Then create a document then attach it into the client.

```
const doc = yorkie.createDocument('examples', 'codemirror');
await client.attach(doc);
```

Now make a change on the document:
```
doc.update((root) => {
  root['key'] = 'value';
}, 'set value to the key');
```

You can subscribe all events from the document.
```
doc.subscribe((event) => {
  console.log(event);
});
```

### Custom CRDT types

#### Text

Text provides support for collaborative plain text editing. Under the hood, text is represented as a list of characters. Compared to using a regular JavaScript array, Text offers better performance.

```
doc.update((root) => {
  const text = root.getOrCreateText('text'); // {"text":""}
  text.edit(0, 0, 'hello');                  // {"text":"hello"}
  text.edit(0, 1, 'H');                      // {"text":"Hello"}
})
```

An example of text co-editing with CodeMirror:

[CodeMirror example](https://github.com/yorkie-team/yorkie-js-sdk/blob/master/dist/index.html)
