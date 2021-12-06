---
title: "Cluster Mode"
layout: docs
category: "Tasks"
order: 7
---

## Cluster Mode

In a production environment, it is generally expected more than one agent to handle requests. Even if an agent goes down, the other agents must be able to handle the request.

We can achieve that by setup Agents with Cluster-Mode.

An example of the cluster is as follows:

```
                        ┌───────────┐
                        │  ┌─────┐  │
                      ┌─┼─►│Agent│  │    ┌───────┐
                      │ │  └──▲──┘  │ ┌─►│MongoDB│
┌──────┐  ┌────────┐  │ │     │     │ │  └───────┘
│Client├─►│Load    ├──┤ │ Broadcast ├─┤
└──────┘  │Balancer│  │ │ DocEvents │ │  ┌────┐
          └────────┘  │ │     │     │ └─►│etcd│
                      │ │  ┌──▼──┐  │    └────┘
                      └─┼─►│Agent│  │
                        │  └─────┘  │
                        └───────────┘
```

- Load Balancer: It is responsible for distributing the load of the requests to the agents.
- Broadcast Channel: It responsible for broadcasting the events to all Agents.
- MongoDB: It stores the data of Yorkie.
- etcd: It is used to store the state of the cluster such as MemberMap, SubscriptionMap, etc.

### Setup Cluster

First, we need components such as etcd, MongoDB, and Load Balancer in order to setup the cluster.

Various load balancers can be used as load balancers for the cluster. For CodePair, We have configured the cluster on AWS, so we use [ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) as Load Balancer.

*For testing cluster mode, we can use Docker Compose to run applications such as etcd and MongoDB. To start them, type `docker-compose -f docker/docker-compose-ci.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie).*

If etcd and MongoDB are ready, we can run Agents in cluster mode. In the terminal, run the Agent with flags for MongoDB and etcd.

```bash
$ yorkie agent --mongodb-uri mongodb://localhost:27017 --etcd-endpoints http://localhost:2379

MongoDB connected, URI: mongodb://localhost:27017, DB: yorkie-meta
etcd connected, URI: [http://localhost:2379]
backend created: id: c6n20nnblaroaopqdbp0, rpc: localhost:11101: db: mongodb://localhost:27017
serving profiling on 11102
serving RPC on 11101
```

Open a new terminal and run the Agent by using `xxx-port` flags to avoid ports conflicts.

```bash
$ yorkie agent --rpc-port 21101 --profiling-port 21102 --mongo-connection-uri mongodb://localhost:27017 --etcd-endpoints http://localhost:2379

MongoDB connected, URI: mongodb://localhost:27017, DB: yorkie-meta
etcd connected, URI: [http://localhost:2379]
backend created: id: c6n25o7blarohq3ve250, rpc: localhost:21101: db: mongodb://localhost:27017
serving profiling on 21102
serving RPC on 21101
```

Now both Agents are ready to receive requests from clients.
