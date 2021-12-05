---
layout: docs
---

## About Yorkie

Yorkie is an open source document store for building collaborative applications such as [Google Docs](https://docs.google.com/) and [Figma](https://www.figma.com/). To achieve that, Yorkie provides synchronization primitives such as JSON-like document and Peer Awareness API.

Yorkie consists of Client, Document, and Agent.

- [Client](./js-sdk#client): Client is a normal client that can communicate with the Agent. We can synchronize the changes of the document by using Client.
- [Document](./js-sdk#document): Document is a CRDT-based data type. We can representing the model of the application. And we can edit it even while offline.
- [Agent](./agent): Agent receives changes from Client, stores them in DB, and propagates the changes to Clients who subscribe to the Document.

High-level overview of Yorkie is as follows:

 ```
 Client "A" (Go)                 Agent                        MemDB or MongoDB
┌───────────────────┐           ┌────────────────────────┐   ┌───────────┐
│  Document "D-1"   │◄─Changes─►│  Collection "C-1"      │   │ Changes   │
│  { a: 1, b: {} }  │           │ ┌───────────────────┐  │◄─►│ Snapshots │
└───────────────────┘           │ │  Document "D-1"   │  │   └───────────┘
 Client "B" (JS)                │ │  { a: 2, b: {} }  │  │
┌───────────────────┐           │ │                   │  │
│  Document "D-1"   │◄─Changes─►│ │  Document "D-2"   │  │
│  { a: 2, b: {} }  │           │ │  { a: 3, b: {} }  │  │
└───────────────────┘           │ └───────────────────┘  │
 Client "C" (Admin)             │                        │
┌────────────────────┐          └────────────────────────┘
│  Query "Q-1"       │               ▲
│ db[c-1].find({a:2})├───── Query────┘
└────────────────────┘
 ```

The overall flows is as follows:

 - Clients can have a replica of the Document representing an application model locally on several devices.
 - Each client can independently edit the document on their local device, even while offline.
 - When a network connection is available, Yorkie figures out which changes need to be synced from one client to another, and brings them into the same state.
 - If the document was changed concurrently on different devices, Yorkie automatically syncs the changes, so that every replica ends up in the same state with resolving conflict.

### Need help?

Be sure to join the Yorkie Slack. If you have any questions along the way, please don’t hesitate to ask us in our [Slack channel](https://dev-yorkie.slack.com/). You can sign up for our [Slack here](https://communityinviter.com/apps/dev-yorkie/yorkie-framework).
