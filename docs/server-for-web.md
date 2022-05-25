---
title: "Server for Web"
layout: docs
category: "Tasks"
permalink: /docs/server-for-web
order: 52
---

## Server for Web

Server uses [gRPC](https://grpc.io/) to provide an API that clients can connect to. It is currently impossible to implement the HTTP/2 gRPC in some browsers, [Envoy](https://www.envoyproxy.io/) is required for web. For more details: [gRPC-web](https://grpc.io/blog/state-of-grpc-web/)

This page shows how to start the server for web. Overall structure is as follows:

```
 Browser            Envoy                  Server
┌────────┐         ┌──────────────┐       ┌───────────┐
│gRPC-web├─HTTP1.1─┤gRPC-web Proxy├─HTTP2─┤gRPC Server│
└────────┘         └──────────────┘       └───────────┘
```

### Start Server with Envoy

Configuring Envoy by hand with its config file is cumbersome, but using [Docker Compose](https://docs.docker.com/compose/) makes it easy.

*NOTE: If docker compose is not installed, install it: [Install Docker Compose](https://docs.docker.com/compose/install/)*

First, downloads all manifests files from [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker). Then execute the following command in the folder containing the downloaded file.

```bash
$ docker-compose up --build -d

Starting yorkie ... done
Starting envoy  ... done
```

This will launch the yorkie(Server) and envoy containers on your environment.

```bash
$ docker ps

IMAGE                      COMMAND                  PORTS                                  NAMES
grpcweb:envoy              "/usr/local/bin/envo…"   0.0.0.0:8080->9090/tcp                 envoy
yorkieteam/yorkie:latest   "yorkie server --ena…"   0.0.0.0:11101-11103->11101-11103/tcp   yorkie
```

Then, the ports of the services are bound to the host environment.

- 8080: gRPC-web port for SDK
- 9090: gRPC-web port for Web Admin([Yorkie House](https://github.com/yorkie-team/yorkie-house))
- 11101: gRPC port for SDK
- 11102: HTML port for profiling Server
- 11103: gRPC port for admin Server

*NOTE: Server stores its data using an in-memory DB that does not provide durability. If you want to store data permanently please refer to [Running Server With MongoDB](/docs/server#running-server-with-mongodb)*

Now lets create a client with address `localhost:8080`.

```javascript
const client = new yorkie.Client('localhost:8080');
await client.activate();
```

Next, let's take a look at the [JS SDK](./js-sdk).

