---
layout: docs
---

## JS SDK

### Getting started

#### Installation

Include the following code in the `<head>` tag of your HTML:
```html
<!-- include yorkie js -->
<script src="yorkie.js"></script>
```

#### How to use

First, create client with RPCAddr(Envoy) then activate it.
```javascript
const client = yorkie.createClient('localhost:8080');
await client.activate();
```

*NOTE: If you want to test Yorkie quickly, You can start Envoy, Yorkie and MongoDB with `docker-compose`. To start them, type `docker-compose up` in [this directory](https://github.com/yorkie-team/yorkie-js-sdk/tree/master/docker).*

Then create a document with a collection name and key then attach it into the client.

```javascript
const doc = yorkie.createDocument('collection-1', 'document-1');
await client.attach(doc);
```

Now make a change on the document:
```javascript
doc.update((root) => {
  root['key'] = 'value'; // {"key":"value"}
});
```

You can subscribe all events from the document.
```javascript
doc.subscribe((event) => {
  // e.g. {"name":"local-change","value":[changes...]}
  //   or {"name":"remote-change","value":[changes...]}
  console.log(event);
});
```

### Updating a document

`Document.update(changeFn, message)` enables you to modify a document. The optional `message` allows you to keep a string to the change. If the document is attached to the client, all changes are automatically synchronized with other clients.

```javascript
doc.update((root) => {
  root['obj'] = {};                 // {"obj":{}}
  root['obj']['num'] = 1;           // {"obj":{"num":1}}
  root['obj']['obj'] = {'str':'a'}; // {"obj":{"num":1,"obj":{"str":"a"}}}
  root['obj']['arr'] = ['1', '2'];  // {"obj":{"num":1,"obj":{"str":"a"},"arr":[1,2]}}
}, 'update document for test');
```

Under the hood, `root` in the `update` function creates a change, a set of operations, using a JavaScript proxy. And Every element has a unique ID, created by the logical clock. This ID is used by Yorkie to track which object is which.

### Custom CRDT types

#### Text

Text provides support for collaborative plain text editing. Under the hood, text is represented as a list of characters. Compared to using a regular JavaScript array, Text offers better performance. And it also has selection information for sharing the cursor position.

```javascript
doc.update((root) => {
  const text = root.createText('text');      // {"text":""}
  text.edit(0, 0, 'hello');                  // {"text":"hello"}
  text.edit(0, 1, 'H');                      // {"text":"Hello"}
  text.updateSelection(0, 1);                // {"text":"^H^ello"}
});
```

An example of text co-editing with CodeMirror:

[CodeMirror example](https://github.com/yorkie-team/yorkie-js-sdk/blob/master/examples/index.html)

#### Counter
Counter support numeric types that change to addition and subtraction. If numeric data needs to be modified at the same time, Counter should be used instead of Primitive.

```javascript
doc.update((root) => {
  const counter = root.createCounter('counter', 1);     // {"counter":1}
  counter.increase(2);                                  // {"counter":3}
  counter.increase(3.5);                                // {"counter":6.5}
  counter.increase(-3.5);                               // {"counter":3}
});
```