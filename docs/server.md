---
title: "Server"
layout: docs
category: "Server"
permalink: /docs/server
order: 40
---

## Server

Server is a typical server. Server receives changes from Client, stores them in DB, and propagates the changes to Clients who subscribe to the Document.

### Getting started

#### Install pre-built binaries

The easiest way to install yorkie is from pre-built binaries:

1. Download the compressed archive file for your platform from [Releases](https://github.com/yorkie-team/yorkie/releases).
2. Unpack the archive file. This results in a directory containing the binaries.
3. Add the executable binaries to your path. For example, rename and/or move the binaries to a directory in your path (like /usr/local/bin), or add the directory created by the previous step to your path.
4. From a shell, test that yorkie is in your path:
```bash
$ yorkie --version
Yorkie: {{site.version}}
...
```

#### Commands (CLI)

Yorkie is controlled via a very easy to use command-line interface (CLI). Yorkie is only a single command-line application: `yorkie`. This application then takes a subcommand such as `server`.

The yorkie CLI is a well-behaved command line application. In erroneous cases, a non-zero exit status will be returned. It also responds to `-h` and `---help` as you'd most likely expect.

To get help for any specific command, pass the `-h` flag to the relevant subcommand. For example, to see help about the members subcommand:

```bash
Start Yorkie server

Usage:
  yorkie server [options] [flags]

Flags:
      --auth-webhook-cache-auth-ttl duration         TTL value to set when caching authorized webhook response. (default 10s)
      --auth-webhook-cache-size int                  The cache size of the authorization webhook. (default 5000)
      --auth-webhook-cache-unauth-ttl duration       TTL value to set when caching unauthorized webhook response. (default 10s)
      --auth-webhook-max-retries uint                Maximum number of retries for an authorization webhook. (default 10)
      --auth-webhook-max-wait-interval duration      Maximum wait interval for authorization webhook. (default 3s)
      --backend-snapshot-interval uint               Interval of changes to create a snapshot. (default 1000)
      --backend-snapshot-threshold uint              Threshold that determines if changes should be sent with snapshot when the number of changes is greater than this value. (default 500)
      --backend-use-default-project                  Whether to use the default project. Even if public key is not provided from the client, the default project will be used for the request. (default true)
  -c, --config string                                Config path
      --enable-pprof                                 Enable runtime profiling data via HTTP server.
      --etcd-dial-timeout duration                   ETCD's dial timeout (default 5s)
      --etcd-endpoints strings                       Comma separated list of etcd endpoints
      --etcd-lock-lease-time duration                ETCD's lease time for lock (default 30s)
      --etcd-password string                         ETCD's password
      --etcd-username string                         ETCD's user name
  -h, --help                                         help for server
      --housekeeping-candidates-limit int            candidates limit for a single housekeeping run (default 500)
      --housekeeping-deactivate-threshold duration   time after which clients are considered deactivate (default 168h0m0s)
      --housekeeping-interval duration               housekeeping interval between housekeeping runs (default 1m0s)
  -l, --log-level string                             Log level: debug, info, warn, error, panic, fatal (default "info")
      --mongo-connection-timeout duration            Mongo DB's connection timeout (default 5s)
      --mongo-connection-uri string                  MongoDB's connection URI
      --mongo-ping-timeout duration                  Mongo DB's ping timeout (default 5s)
      --mongo-yorkie-database string                 Yorkie's database name in MongoDB (default "yorkie-meta")
      --profiling-port int                           Profiling port (default 11102)
      --rpc-cert-file string                         RPC certification file's path
      --rpc-key-file string                          RPC key file's path
      --rpc-max-requests-bytes uint                  Maximum client request size in bytes the server will accept. (default 4194304)
      --rpc-port int                                 RPC port (default 11101)
```

#### Running Server

Next, let's start a Yorkie Server. Server runs until they're told to quit and handle the communication of maintenance tasks of Server. and start the server:

```bash
$ yorkie server

backend created: id: c6ljcdl94818baveba8g, rpc: localhost:11101: db: memory
serving admin on 11103
serving RPC on 11101
serving profiling on 11102
```

Server stores its data using an in-memory DB that does not provide durability by default.

### Running Server with MongoDB

If you start an Server with MongoDB address, you can permanently save the data stored by Yorkie.

*To start MongoDB, `docker-compose -f docker/docker-compose.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie).*

Then start a Yorkie server with `--mongo-connection-uri` flag to connect the MongoDB.

```bash
$ yorkie server --mongo-connection-uri mongodb://localhost:27017

MongoDB connected, URI: mongodb://localhost:27017, DB: yorkie-meta
backend created: id: c6ljibt948102kkt9neg, rpc: localhost:11101: db: mongodb://localhost:27017
serving profiling on 11102
serving RPC on 11101
```

