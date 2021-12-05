---
title: "Agent"
layout: docs
order: 4
---

## Agent

Agent is a typical server. Agent receives changes from Client, stores them in DB, and propagates the changes to Clients who subscribe to the Document.

### Getting started

#### Install pre-built binaries

The easiest way to install yorkie is from pre-built binaries:

1. Download the compressed archive file for your platform from [Releases](https://github.com/yorkie-team/yorkie/releases).
2. Unpack the archive file. This results in a directory containing the binaries.
3. Add the executable binaries to your path. For example, rename and/or move the binaries to a directory in your path (like /usr/local/bin), or add the directory created by the previous step to your path.
4. From a shell, test that yorkie is in your path:
```bash
$ yorkie --version
Yorkie: 0.1.12
...
```

#### Commands (CLI)

Yorkie is controlled via a very easy to use command-line interface (CLI). Yorkie is only a single command-line application: `yorkie`. This application then takes a subcommand such as `agent`.

The yorkie CLI is a well-behaved command line application. In erroneous cases, a non-zero exit status will be returned. It also responds to `-h` and `---help` as you'd most likely expect.

To get help for any specific command, pass the `-h` flag to the relevant subcommand. For example, to see help about the members subcommand:

```bash
$ yorkie agent -h
Starts yorkie agent

Usage:
  yorkie agent [options] [flags]

Flags:
      --auth-webhook-cache-auth-ttl duration      TTL value to set when caching authorized webhook response. (default 10s)
      --auth-webhook-cache-size int               The cache size of the authorization webhook. (default 5000)
      --auth-webhook-cache-unauth-ttl duration    TTL value to set when caching unauthorized webhook response. (default 10s)
      --auth-webhook-max-retries uint             Maximum number of retries for an authorization webhook. (default 10)
      --auth-webhook-max-wait-interval duration   Maximum wait interval for authorization webhook. (default 3s)
      --auth-webhook-methods strings              List of methods that require authorization checks. If no value is specified, all methods will be checked.
      --auth-webhook-url string                   URL of remote service to query authorization
      --backend-snapshot-interval uint            Interval of changes to create a snapshot (default 100)
      --backend-snapshot-threshold uint           Threshold that determines if changes should be sent with snapshot when the number of changes is greater than this value. (default 500)
  -c, --config string                             Config path
      --enable-pprof                              Enable runtime profiling data via HTTP server.
      --etcd-dial-timeout duration                ETCD's dial timeout (default 5s)
      --etcd-endpoints strings                    Comma separated list of etcd endpoints
      --etcd-lock-lease-time duration             ETCD's lease time for lock (default 30s)
      --etcd-password string                      ETCD's password
      --etcd-username string                      ETCD's user name
  -h, --help                                      help for agent
      --mongo-connection-timeout duration         Mongo DB's connection timeout (default 5s)
      --mongo-connection-uri string               MongoDB's connection URI
      --mongo-ping-timeout duration               Mongo DB's ping timeout (default 5s)
      --mongo-yorkie-database string              Yorkie's database name in MongoDB (default "yorkie-meta")
      --profiling-port int                        Profiling port (default 11102)
      --rpc-cert-file string                      RPC certification file's path
      --rpc-key-file string                       RPC key file's path
      --rpc-max-requests-bytes uint               Maximum client request size in bytes the server will accept. (default 4194304)
      --rpc-port int                              RPC port (default 11101)
```

#### Running Agent

Next, let's start a Yorkie agent. Agent runs until they're told to quit and handle the communication of maintenance tasks of Agent. and start the agent:

```bash
$ yorkie agent

backend created: id: c6ljcdl94818baveba8g, rpc: localhost:11101: db: memory
serving profiling on 11102
serving RPC on 11101
```

Agent store its data using an in-memory DB that does not provide durability by default.

### Running Agent with MongoDB

If you start an Agent with MongoDB address, you can permanently save the data stored by Yorkie.

*To start MongoDB, `docker-compose -f docker/docker-compose.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie).*

Then start a Yorkie agent with `--mongo-connection-uri` flag to connect the MongoDB.

```bash
$ yorkie agent --mongo-connection-uri mongodb://localhost:27017

MongoDB connected, URI: mongodb://localhost:27017, DB: yorkie-meta
backend created: id: c6ljibt948102kkt9neg, rpc: localhost:11101: db: mongodb://localhost:27017
serving profiling on 11102
serving RPC on 11101
```

### Auth Webhook

Webhook is an HTTP POST that is called when something happens. When specified, Auth Webhook causes Agent to query an outside REST service when determining user privileges.

The overall flow is as follows:

```
(5) response the request (4) handle the request
     ┌─────────────────┐ ┌──┐
     │                 │ │  │   (3) response
     ▼                 │ ▼  │    - allowed
 ┌──────┐             ┌┴────┤    - reason   ┌──────────────┐
 │Client├────────────►│Agent│◄──────────────┤Outside Server│
 └──────┘ (1)request  └───┬─┘               └──────────────┘
           - token        │                      ▲
           - dockey       └──────────────────────┘
                              (2) call webhook
                               - token
                               - dockey
                               - verb: r or rw
```

We can pass some tokens when creating a client:

```javascript
yorkie.createClient('localhost:8080', {
  token: SOME_TOKEN,
});
```

When running an Agent, We can specify the Auth Webhook by the `--authorization-webhook` flag:

````bash
$ yorkie agent --authorization-webhook=http://localhost:3000/auth-hook
```

When the client sends every request, it passes the token to Agent. The Agent who receives the token calls Webhook before processing the requests.

Here is an example of the webhook requests:

```javascript
{
  "token": "SOME_TOKEN",          // token passed by the client
  "method": "PushPull",           // method: ActivateClient, DeactivateClient, AttachDocument, DetachDocument, WatchDocuments
  documentAttributes: [{
    key: "COLLECTION$DOCUMENT", // document key
    verb: "r"                   // 'r' or 'rw'
  }]
}
```

The outside server should respond like this:

```javascript
{
  "allowed": true, // or false if the given token is not privileged for this document.
  "reason": "ok"   // [optional] reason for this response.
}
```
