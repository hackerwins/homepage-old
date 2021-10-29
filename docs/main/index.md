---
layout: docs
---

## About Yorkie

Yorkie is an open source document store for building collaborative applications. Yorkie provides synchronization primitives such as JSON-like document and Peer Awareness API to easily develop real-time collaborative applications.

Yorkie consists of Document, Client, and Agent.

- Document: Document is a CRDT-based data type. We can representing the model of the application. And we can edit it even while offline.
- Client: Client is a normal client that can communicate with the Agent. We can synchronize the changes of the document by using Client.
- Agent: Agent receives changes from Client, stores them in DB, and propagates the changes to Clients who subscribe to the Document.

High-level overview of Yorkie is as follows:

 ```
 Client "A" (Go)                 Agent                        Mongo DB
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
│ db[c-1].find({a:2})├─MongoDB Query─┘
└────────────────────┘
 ```

 - Clients can have a replica of the Document representing an application model locally on several devices.
 - Each client can independently edit the document on their local device, even while offline.
 - When a network connection is available, Yorkie figures out which changes need to be synced from one client to another, and brings them into the same state.
 - If the document was changed concurrently on different devices, Yorkie automatically syncs the changes, so that every replica ends up in the same state with resolving conflict.

### Agent and SDKs

Yorkie provides JS SDK, Agent, and Database to eliminate the tedious work, can be operational and can use the services just out-of-box.

 - Agent: [yorkie-team/yorkie](https://github.com/yorkie-team/yorkie)
 - Go Client: [yorkie-team/yorkie/client](https://github.com/yorkie-team/yorkie/tree/main/client)
 - JS SDK: [yorkie-team/yorkie-js-sdk](https://github.com/yorkie-team/yorkie-js-sdk)

### Need help?

Be sure to join the Yorkie Slack. If you have any questions along the way, please don’t hesitate to ask us in our [Slack channel](https://dev-yorkie.slack.com/). You can sign up for our [Slack here](https://communityinviter.com/apps/dev-yorkie/yorkie-framework).
