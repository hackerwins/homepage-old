---
title: "Quick Start"
layout: docs
category: "Quick Start"
order: 2
---

## Quick Start

Currently, only JS SDK is developed among SDKs. Let's start using Yorkie with JS SDK and Agent.

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

*NOTE: If you want to test Yorkie quickly, You can start Envoy and Yorkie with `docker-compose`.<br>
To start them, type `docker-compose -f docker/docker-compose.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie-js-sdk).*

### How to use

First, create client with RPCAddr then activate it.
```javascript
const client = yorkie.createClient('localhost:8080');
await client.activate();
```

Then create a document with a collection name and key of document then attach it into the client.

```javascript
const doc = yorkie.createDocument('collection-1', 'document-1');
await client.attach(doc);
```

This automatically synchronizes all changes to the document attached to the client with the remote peers.

Now make a change on the document:
```javascript
doc.update((root) => {
  root['key'] = 'value'; // {"key":"value"}
});
```

The changes are applied immediately locally and propagated to other peers that have attached the document.

Next, let's take a look at the [JS SDK](./js-sdk).

