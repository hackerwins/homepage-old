---
title: "Peer Awareness"
layout: docs
category: "Tasks"
permalink: /docs/peer-awareness
order: 53
---

## Peer Awareness

Peer Awareness is a feature often required in collaborative applications. With Peer Awareness, we can display information such as names and colors about peers who are editing a document together in the application. Example of Peer Awareness in [CodePair](https://codepair.yorkie.dev/):

<img src="/images/peer-awareness.png" width="100%" style="max-width:400px">

This page shows how to implement Peer Awareness in your application.

### How to implement

When creating a client, we can pass information of the client to other peers attaching the same document with presence.

```javascript
const clientA = yorkie.createClient('localhost:8080', {
  presence: {
    username: 'alice',
    color: 'blue',
  },
});
await client.activate();

const docA = yorkie.createDocument('doc-1');
await clientA.attach(docA);
```


Then another client is created and attaches a document with the same name as before.

```javascript
const clientB = yorkie.createClient('localhost:8080', {
  presence: {
    username: 'bob',
    color: 'red',
  },
});
await clientB.activate();

const docB = yorkie.createDocument('doc-1');
await clientB.attach(docB);
```

Once a new peer registers or leaves, `peers-changed` event is fired, and the other peer's clientID and presence can be obtained from the event.

```javascript
const unsubscribe = clientA.subscribe((event) => {
  if (event.type === 'peers-changed') {
    const peers = event.value[doc.getKey()];
    for (const [clientID, presence] of Object.entries(peers)) {
      console.log(clientID, presence); // e.g.) presence: {username: 'bob', color: 'red'}
    }
  }
});
```

In the example above, `clientA` will receive information from `clientB`.
