---
layout: docs
---

## Yorkie

Yorkie is an open source framework for building collaborative editing applications. Yorkie provides the SDK, Server, and Database to eliminate the tedious work, can be operational and can use the services just out-of-box. Yorkie will take care of the collaborative features while you focus on your direct services.

 ```
  +--Client "A" (Go)----+
  | +--Document "D-1"-+ |               +--Agent------------------+
  | | { a: 1, b: {} } | <-- Changes --> | +--Collection "C-1"---+ |
  | +-----------------+ |               | | +--Document "D-1"-+ | |      +--Mongo DB---------------+
  +---------------------+               | | | { a: 1, b: {} } | | |      | Changes                 |
                                        | | +-----------------+ | | <--> | Snapshot with CRDT Meta |
  +--Client "B" (JS)----+               | | +--Document "D-2"-+ | |      | Snapshot for query      |
  | +--Document "D-1"-+ |               | | | { a: 1, b: {} } | | |      +-------------------------+
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

### Why yorkie?

Technology for real-time collaborative editing has been developed and serviced by large companies for a long time. However, no reliable framework is available to the public for production usage. Most of them are specialized for academic uses or implemented for internal services only.

Yorkie provides a reliable framework that can be used for services that handles heavy traffic.
