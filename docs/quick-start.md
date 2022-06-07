---
title: "Quick Start"
layout: docs
category: "Quick Start"
permalink: /docs/quick-start
order: 20
---

## Quick Start

Let's start using Yorkie with the JS SDK and a Server. You need an environment that can run JavaScript, such as a browser.

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

If you want to test Yorkie quickly, You can start `Envoy` and `Yorkie` with `docker-compose`. To start them, download manifest files from the [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker), and then type `docker-compose up --build -d` in the folder.
For more details, please refer to [Server for Web](./server-for-web).

### How to use Yorkie

#### 1. Activating a Client

First, create a Client with RPCAddr and activate it.
```javascript
const client = new yorkie.Client('localhost:8080');
await client.activate();
```

#### 2. Attaching a Document

Then, create a Document with a key of Document and attach it to the Client.

```javascript
const doc = new yorkie.Document('doc-1');
await client.attach(doc);
```

This automatically synchronizes all changes to the Document attached to the Client with the remote peers.

#### 3. Updating the Document

Now let's make a change on the Document:
```javascript
doc.update((root) => {
  root['key'] = 'value'; // {"key":"value"}
});
```

The changes are immediately applied locally and propagated to other peers who subscribe to the Document.

Next, let's take a look at the [JS SDK](./js-sdk).

