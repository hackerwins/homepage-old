---
layout: docs
---

## About Yorkie

Yorkie is an open source framework for building collaborative editing applications. Yorkie provides the SDK, Server, and Database to eliminate the tedious work, can be operational and can use the services just out-of-box. Yorkie will take care of the collaborative features while you focus on your direct services.

 ```
  +--Client "A" (Go)----+
  | +--Document "D-1"-+ |               +--Agent------------------+
  | | { a: 1, b: {} } | <-- Changes --> | +--Collection "C-1"---+ |
  | +-----------------+ |               | | +--Document "D-1"-+ | |     +--Mongo DB--+
  +---------------------+               | | | { a: 1, b: {} } | | |     | Changes    |
                                        | | +-----------------+ | | <-> | Snapshot   |
  +--Client "B" (JS)----+               | | +--Document "D-2"-+ | |     +------------+
  | +--Document "D-1"-+ |               | | | { a: 1, b: {} } | | |
  | | { a: 2, b: {} } | <-- Changes --> | | +-----------------+ | |
  | +-----------------+ |               | +---------------------+ |
  +---------------------+               +-------------------------+
                                                     ^
  +--Client "C" (JS)------+                          |
  | +--Query "Q-1"------+ |                          |
  | | db.['C-1'].find() | <-- MongoDB query ---------+
  | +-------------------+ |
  +-----------------------+
 ```

 - Clients can have a replica of the document representing an application model locally on several devices.
 - Each client can independently update the document on their local device, even while offline.
 - When a network connection is available, Yorkie figures out which changes need to be synced from one device to another, and brings them into the same state.
 - If the document was changed concurrently on different devices, Yorkie automatically syncs the changes, so that every replica ends up in the same state with resolving conflict.

### Agent and SDKs
 - Agent: [yorkie-team/yorkie](https://github.com/yorkie-team/yorkie)
 - Go Client: [yorkie-team/yorkie/client](https://github.com/yorkie-team/yorkie/tree/master/client)
 - JS SDK: [yorkie-team/yorkie-js-sdk](https://github.com/yorkie-team/yorkie-js-sdk)

### Need help?

Be sure to join the Yorkie Slack. If you have any questions along the way, please don’t hesitate to ask us in our [Slack channel](https://dev-yorkie.slack.com/). You can sign up for our [Slack here](https://communityinviter.com/apps/dev-yorkie/yorkie-framework).
