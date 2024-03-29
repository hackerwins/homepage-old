---
title: "About Yorkie"
layout: docs
category: "About Yorkie"
permalink: /docs
order: 10
---

## About Yorkie

Yorkie is an open source document store for building collaborative applications such as [Google Docs](https://docs.google.com/) and [Figma](https://www.figma.com/). To achieve that, Yorkie provides synchronization primitives such as a JSON-like Document([CRDT](https://crdt.tech/)), [Peer Awareness](/docs/peer-awareness) and [Authentication](/docs/auth-webhook).

Unlike libraries such as AutoMerge and Yjs, it contains SDKs, a server, and a DB, enabling the implementation of the co-editing feature with less effort.

Next, let's take a look at Yorkie's structure and how it works.

### Components

Yorkie consists of Clients, Documents, and a Server.

- [Client](/docs/js-sdk#client): A Client is a normal client that can communicate with a Server. Changes on a Document can be synchronized by using a Client.
- [Server](/docs/server): A Server receives changes from Clients, stores them in the DB, and propagates them to Clients who subscribe to Documents.
- [Document](/docs/js-sdk#document): A Document is a CRDT-based data type through which the model of the application is represented. Clients can edit it even while offline.
- [Project](/docs/project): A Project represents services or applications in Yorkie. Separate Projects can exist within a single application.

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

 - Clients can have a replica of a Document representing an application model locally on several devices.
 - Each Client can independently edit the Document on his or her local devices, even while offline.
 - When a network connection is available, Yorkie figures out which changes need to be synced from one Client to another, and brings them into the same state.
 - If the Document is being changed concurrently on different devices, Yorkie automatically syncs the changes so that every replica ends up in the same state with conflicts resolved.

Next, let's see how to use Yorkie from [Quick Start](/docs/quick-start).
