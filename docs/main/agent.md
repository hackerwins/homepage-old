---
layout: docs
---

## Agent

For now, we didn't deploy binary yet. So you should [compile Yorkie yourself](#building-yorkie).

### Building Yorkie

For building Agent, You'll first need [Go](https://golang.org) installed (version 1.16+ is required). Make sure you have Go properly [installed](https://golang.org/doc/install), including setting up your [GOPATH](https://golang.org/doc/code.html#GOPATH).

Next, clone this repository into some local directory and then just type `make build`. In a few moments, you'll have a working `yorkie` executable:
```bash
$ make build
go build -o ./bin/yorkie

$ ./bin/yorkie
Document store for collaborative applications based on CRDT

Usage:
  yorkie [command]

Available Commands:
  agent       Starts yorkie agent
  help        Help about any command
  version     Print the version number of Yorkie

Flags:
  -h, --help   help for yorkie

Use "yorkie [command] --help" for more information about a command.
```

### Commands (CLI)

Yorkie is controlled via a very easy to use command-line interface (CLI). Yorkie is only a single command-line application: `yorkie`. This application then takes a subcommand such as `agent`.

The yorkie CLI is a well-behaved command line application. In erroneous cases, a non-zero exit status will be returned. It also responds to `-h` and `---help` as you'd most likely expect.

To get help for any specific command, pass the `-h` flag to the relevant subcommand. For example, to see help about the members subcommand:

```bash
$ yorkie agent -h
Starts yorkie agent

Usage:
  yorkie agent [options] [flags]

Flags:
      --backend-snapshot-interval uint     Interval of changes to create a snapshot (default 100)
      --backend-snapshot-threshold uint    Threshold that determines if changes should be sent with snapshot when the number of changes is greater than this value. (default 500)
  -c, --config string                      Config path
      --etcd-endpoints strings             Comma separated list of etcd endpoints
  -h, --help                               help for agent
      --metrics-port int                   Metrics port (default 11102)
      --mongo-connection-timeout-sec int   Mongo DB's connection timeout in seconds (default 5)
      --mongo-connection-uri string        MongoDB's connection URI (default "mongodb://localhost:27017")
      --mongo-ping-timeout-sec int         Mongo DB's ping timeout in seconds (default 5)
      --mongo-yorkie-database string       Yorkie's database name in MongoDB (default "yorkie-meta")
      --rpc-cert-file string               RPC certification file's path
      --rpc-key-file string                RPC key file's path
      --rpc-port int                       RPC port (default 11101)
```

### Running Agent

Next, let's start a Yorkie agent. Agent runs until they're told to quit and handle the communication of maintenance tasks of Agent. and start the agent:

```bash
$ ./bin/yorkie agent
```

*NOTE: Yorkie uses MongoDB to store it's data. To start MongoDB, `docker-compose -f docker/docker-compose.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie).*

Use the `--mongo-connection-uri` option to change he MongoDB connectionURI.

```bash
$ ./bin/yorkie agent --mongo-connection-uri mongodb://localhost:27017
```

