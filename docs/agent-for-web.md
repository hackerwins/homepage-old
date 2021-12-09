---
title: "Agent for Web"
layout: docs
category: "Tasks"
permalink: /docs/agent-for-web
order: 51
---

## Agent for Web

Agent provides API using [gRPC](https://grpc.io/), so [Envoy](https://www.envoyproxy.io/) is required for web.

Overall structure is as follows:

```
 Browser            Envoy                  Agent
┌────────┐         ┌──────────────┐       ┌───────────┐
│gRPC-web├─HTTP1.1─┤gRPC-web Proxy├─HTTP2─┤gRPC Server│
└────────┘         └──────────────┘       └───────────┘
```
For more details: [gRPC-web](https://grpc.io/blog/state-of-grpc-web/)

### Start Agent with Envoy

Configuring Envoy by hand with its config file is cumbersome, but using [Docker Compose](https://docs.docker.com/compose/) makes it easy.

*NOTE: If docker compose is not installed, install it: [Install Docker Compose](https://docs.docker.com/compose/install/)*

First, downloads all manifests files from [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker). Then execute the following command in the folder containing the downloaded file.

```bash
$ docker-compose up --build -d

Starting yorkie ... done
Starting envoy  ... done
```

This will launch the yorkie(Agent) and envoy containers on your environment.

```bash
$ docker ps

IMAGE                      COMMAND                  PORTS                                  NAMES
grpcweb:envoy              "/usr/local/bin/envo…"   0.0.0.0:8080->8080/tcp                 envoy
yorkieteam/yorkie:latest   "yorkie agent --enab…"   0.0.0.0:11101-11102->11101-11102/tcp   yorkie
```

Then, the ports of the services are bound to the host environment.

- 8080: gRPC port for Web
- 11101: gRPC port
- 11102: port for profiling Agent

Now lets create a client with address `localhost:8080`.

```javascript
const client = yorkie.createClient('localhost:8080');
await client.activate();
```

Next, let's take a look at the [JS SDK](./js-sdk).

