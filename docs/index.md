---
title: "About Yorkie"
layout: docs
category: "About Yorkie"
permalink: /docs
order: 10
---

## About Yorkie

Yorkie is an open source document storage for building collaborative applications such as [Google Docs](https://docs.google.com/) and [Figma](https://www.figma.com/). To achieve that, Yorkie provides synchronization primitives such as JSON-like document([CRDT](https://crdt.tech/)), [Peer Awareness](/docs/peer-awareness) and [Authentication](/docs/auth-webhook).

Unlike libraries such as AutoMerge and Yjs, it contains SDKs, server and DB, through which you can implement the co-editing feature with less effort.

Next, let's take a look at Yorkie's structure and how it works.

### Components

Yorkie consists of Client, Document, and Server.

- [Client](/docs/js-sdk#client): Client is a normal client that can communicate with the Server. We can synchronize the changes of the document by using Client.
- [Server](/docs/server): Server receives changes from Client, stores them in DB, and propagates the changes to Clients who subscribe to the Document.
- [Document](/docs/js-sdk#document): Document is a CRDT-based data type. We can represent the model of the application through it, and we can edit it even while offline.
- [Project](/docs/project): Project represents your service or application in Yorkie. For example, you might have separate projects for your application.

### How it works

A high-level overview of Yorkie is as follows:

```
 Client "A" (Go)                 Server                       MemDB or MongoDB
┌───────────────────┐           ┌────────────────────────┐   ┌───────────┐
│  Document "D-1"   │◄─Changes─►│  Project "p-1"         │   │ Changes   │
│  { a: 1, b: {} }  │           │ ┌───────────────────┐  │◄─►│ Snapshots │
└───────────────────┘           │ │  Document "D-1"   │  │   └───────────┘
 Client "B" (JS)                │ │  { a: 2, b: {} }  │  │
┌───────────────────┐           │ │                   │  │
│  Document "D-1"   │◄─Changes─►│ │  Document "D-2"   │  │
│  { a: 2, b: {} }  │           │ │  { a: 3, b: {} }  │  │
└───────────────────┘           │ └───────────────────┘  │
 Admin (CLI, Web)               │                        │
┌───────────────────┐           └────────────────────────┘
│  Query "Q-1"      │                 ▲
│  P-1.find({a:2})  ├─────── Query────┘
└───────────────────┘
```

The overall flow is as follows:

 - Clients can have a replica of the Document representing an application model locally on several devices.
 - Each client can independently edit the document on his or her local devices, even while offline.
 - When a network connection is available, Yorkie figures out which changes need to be synced from one client to another, and brings them into the same state.
 - If the document is being changed concurrently on different devices, Yorkie automatically syncs the changes so that every replica ends up in the same state with conflicts resolved.

Next, let's see how to use Yorkie from [Quick Start](/docs/quick-start).
