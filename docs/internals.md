---
title: "Internals"
layout: docs
category: "Internals"
permalink: /docs/internals
order: 70
---

## Internals

This section goes over some of the internals of Yorkie, such as the CRDT, ordering of messages via Lamport clocks, etc.

- [Internals: Garbage Collection](./garbage-collection)

*Note: Because this section explains internals for understanding the techniques, It is not essential for using Yorkie.*

### References

For more details on the techniques used for understanding Yorkie, we recommend reading the following papers:

 - H.-G. Roh, M. Jeon, J.-S. Kim, and J. Lee, “Replicated abstract data types: Building blocks for collaborative applications,” J. Parallel Distrib. Comput., vol. 71, no. 3, pp. 354–368, Mar. 2011. [Online].
 - Weihai Yu, “Supporting String-Wise Operations and Selective Undo for Peer-to-Peer Group Editing.“
 - Loïck Briot, Pascal Urso, Marc Shapiro, “High Responsiveness for Group Editing CRDTs“.

