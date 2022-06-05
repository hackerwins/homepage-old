---
title: "JS SDK"
layout: docs
category: "JS SDK"
permalink: /docs/js-sdk
order: 30
---

## JS SDK

Through Yorkie JS SDK, you can efficiently building collaborative applications. On the client-side implementation, you can create documents that are automatically synced with remote peers with minimal effort.

### Client

`Client` is a normal client that can communicate with the server. It has documents and sends changes of the document in local to the server to synchronize with other replicas in remote.

#### Creating a client

We can create a client using `new yorkie.Client()`. After the client is activated, it is connected to the server and ready to use.

```javascript
const client = new yorkie.Client('localhost:8080');
await client.activate();
```

#### Subscribing client events

We can use `client.subscribe` to subscribe client-based events, such as `status-changed`, `stream-connection-status-changed` and `peer-changed`. 

```javascript
const unsubscribe = client.subscribe((event) => {
  if (event.type === 'status-changed') {
    console.log(event.value); // 'activated' or 'deactivated'
  } else if (event.type === 'stream-connection-status-changed') {
    console.log(event.value); // 'connected' or 'disconnected'
  }
});
```

By using the value of the `stream-connection-status-changed` event, it is possible to determine whether the client is connected to the network.

If you want to know about other ClientEvents, please refer to the [ClientEventType](https://yorkie.dev/yorkie-js-sdk/yorkie-js-sdk.clienteventtype).

### Document

`Document` is primary data type in Yorkie, providing a JSON-like updating experience that makes it easy to represent your application's model. `Document` can be updated without attaching it to the client, and changes are automatically propagated to other peers when attaching it to the client or when the network is restored.

#### Creating a document

We can create a document using `yorkie.Document()`. Let's create a document with a key of document then attach it into the client.

```javascript
const doc = new yorkie.Document('doc-1');
await client.attach(doc);
```

After attaching the document to the client, all changes to the document are automatically synchronized with remote peers.

#### Editing the document

`Document.update(changeFn, message)` enables you to modify a document. The optional `message` allows you to keep a string to the change. If the document is attached to the client, all changes are automatically synchronized with other clients.

```javascript
const message = 'update document for test';
doc.update((root) => {
  root.obj = {};              // {"obj":{}}
  root.obj.num = 1;           // {"obj":{"num":1}}
  root.obj.obj = {'str':'a'}; // {"obj":{"num":1,"obj":{"str":"a"}}}
  root.obj.arr = ['1', '2'];  // {"obj":{"num":1,"obj":{"str":"a"},"arr":[1,2]}}
}, message);
```

Under the hood, `root` in the `update` function creates a `change`, a set of operations, using a JavaScript proxy. And Every element has a unique ID, created by the logical clock. This ID is used by Yorkie to track which object is which.

And you can get the contents of the document using `document.getRoot()`.

```javascript
const root = doc.getRoot();
console.log(root.obj);     // {"num":1,"obj":{"str":"a"},"arr":[1,2]}
console.log(root.obj.num); // 1
console.log(root.obj.obj); // {"str":"a"}
console.log(root.obj.arr); // [1,2]
```

#### Subscribing document events

A document is modified by changes generated remotely or locally in Yorkie. When the document is modified, change events occur and we can subscribe to it using `document.subscribe`. Here, we can do post-processing such as repaint in the application using the `path` of the change events.

```javascript
doc.subscribe((event) => {
  if (event.type === 'local-change') {
    console.log(event);
  } else if (event.type === 'remote-change') {
    for (const changeInfo of event.value) {
      // `message` delivered when calling document.update
      console.log(changeInfo.change.message);
      for (const path of changeInfo.paths) {
        if (path.startsWith('$.obj.num') {
          // root.obj.num is changed
        } else if (path.startsWith('$.obj')) {
          // root.obj is changed
        }
      }
    }
  }
});
```

### Custom CRDT types

Custom CRDT types are data types that can be used for special applications such as text editors and counters, unlike general JSON data types such as `Object` and `Array`. Custom CRDT types can be created in the callback function of `document.update`.

#### Text

`Text` provides support for collaborative plain text editing. Under the hood, `Text` is represented as a list of characters. Compared to using a regular JavaScript array, Text offers better performance. And it also has selection information for sharing the cursor position.

```javascript
doc.update((root) => {
  root.text = new yorkie.Text();  // {"text":""}
  root.text.edit(0, 0, 'hello');  // {"text":"hello"}
  root.text.edit(0, 1, 'H');      // {"text":"Hello"}
  root.text.select(0, 1);         // {"text":"^H^ello"}
});
```

An example of Text co-editing with CodeMirror: [CodeMirror example](https://github.com/yorkie-team/yorkie-js-sdk/blob/main/examples/index.html), [Demos](/demos)

#### RichText

`RichText` is similar to `Text` except that we can add attributes to contents.

```javascript
doc.update((root) => {
  root.text = new yorkie.RichText();       // {"text":""}
  root.text.edit(0, 0, 'hello');           // {"text":"hello"}
  root.text.edit(0, 1, 'H');               // {"text":"Hello"}
  root.text.setStyle(0, 1, {bold: true});  // {"text":"<b>H</b>ello"}
});
```

An example of RichText co-editing with Quill: [Quill example](https://github.com/yorkie-team/yorkie-js-sdk/blob/main/examples/quill.html), [Demos](/demos)

#### Counter
`Counter` support numeric types that change to addition and subtraction. If numeric data needs to be modified at the same time, `Counter` should be used instead of Primitive.

```javascript
doc.update((root) => {
  root.counter = new yorkie.Counter(1);     // {"counter":1}
  root.counter.increase(2);                 // {"counter":3}
  root.counter.increase(3.5);               // {"counter":6.5}
  root.counter.increase(-3.5);              // {"counter":3}
});
```

### TypeScript Support

To use document more strictly, we can use [type variable](https://www.typescriptlang.org/docs/handbook/2/generics.html) in TypeScript when creating a Document.

```typescript
type DocType = {
  list: Array<number>;
  text: yorkie.Text;
}

const doc = new yorkie.Document<DocType>('key');
doc.update((root) => {
  root.list = [1, 2, 3];
  root.text = new yorkie.Text();
});
```

### Reference

For details on how to use the JS SDK, please refer to [JS SDK Reference](https://yorkie.dev/yorkie-js-sdk).

Next, Let's take a look at the various [Tasks](./tasks) that can be performed with Yorkie.

