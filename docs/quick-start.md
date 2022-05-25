---
title: "Quick Start"
layout: docs
category: "Quick Start"
permalink: /docs/quick-start
order: 20
---

## Quick Start

Let's start using Yorkie with JS SDK and Server. You need an environment that can run JavaScript, such as a browser.

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

If you want to test Yorkie quickly, You can start `Envoy` and `Yorkie` with `docker-compose`. To start them, downloads manifests files from [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker), then type `docker-compose up --build -d` in the folder.
For more details please refer to [Server for Web](./server-for-web)

### How to use

#### 1. Activating Client

First, create client with RPCAddr then activate it.
```javascript
const client = new yorkie.Client('localhost:8080');
await client.activate();
```

#### 2. Attaching Document

Then create a document with a key of document then attach it into the client.

```javascript
const doc = new yorkie.Document('doc-1');
await client.attach(doc);
```

This automatically synchronizes all changes to the document attached to the client with the remote peers.

#### 3. Updating Document

Now let's make a change on the document:
```javascript
doc.update((root) => {
  root['key'] = 'value'; // {"key":"value"}
});
```

The changes are applied immediately locally and propagated to other peers that have attached the document.

Next, let's take a look at the [JS SDK](./js-sdk).

