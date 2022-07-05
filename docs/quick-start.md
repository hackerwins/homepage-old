---
title: "Quick Start"
layout: docs
category: "Quick Start"
permalink: /docs/quick-start
order: 20
---

## Quick Start

Let's start using Yorkie with the JS SDK and a Server. You need an environment that can run JavaScript, such as a browser.

### Requirements

You must run docker to test Yorkie. You can start `Envoy` and `Yorkie` with `docker-compose`. To run docker, download manifest files from [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker), and then type `docker-compose up --build -d` in the folder directory.

```bash
$ docker-compose up --build -d
```

For more details, please refer to [Server for Web](./server-for-web).

### Installation

Install Yorkie JS SDK using npm:

```bash
$ npm install yorkie-js-sdk
```

or just include the following code in the `<head>` tag of your HTML:

```html
<!-- include yorkie js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/yorkie-js-sdk/{{site.version}}/yorkie-js-sdk.js"></script>
```

### How to use Yorkie

#### 1. Initializing Document Properties

First, create a Client and a Document.

```js
async function main() {
  // 01. create a new client instance and connect to the yorkie server
  const client = new yorkie.Client("http://localhost:8080");
  await client.activate();

  // 02. create a new document and attach it to the client
  const doc = new yorkie.Document("document");
  await client.attach(doc);
}
```

The created document should be attached to the client to automatically synchronize the document between the client and peers.

#### 2. Updating the Document

The created document is initially an empty object. You can create or update a key-value property you would like to share with peers using `doc.update()`.

```js
doc.update((root) => {
  root["key"] = "value"; // {"key":"value"}
});
```

#### 3. Subscribing to the changes that happen in the Document

Clients sharing the same document can subscribe to the changes that happen in the Document using `doc.subscribe()`

```js
doc.subscribe((event) => {
  console.log("A change event occurred in the Document!");
});
```

You can execute different actions depending on the source of change. The source can be accessed from `event.type`.

```js
doc.subscribe((event) => {
  if (event.type === "remote-change") {
    console.log("A peer has changed the Document!");
  }
});
```

#### 4. Viewing the presence of other peers

Other peers' activities can be accessed by subscribing to the client.

```js
client.subscribe((event) => {
  if (event.type === "peers-changed") {
    const peers = event.value[doc.getKey()];
    const peersCount = Object.entries(peers).length;
    console.log(`There are currently ${peersCount} peers`);
  }
});
```

Next, let's take a look at the [JS SDK](./js-sdk).
