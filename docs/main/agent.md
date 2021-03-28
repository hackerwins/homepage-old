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
Starts yorkie agent.

Usage:
  yorkie agent [options] [flags]

Flags:
  -c, --config string   config path
  -h, --help            help for agent
```

### Running Agent

Next, let's start a Yorkie agent. Agent runs until they're told to quit and handle the communication of maintenance tasks of Agent. and start the agent:

```bash
$ ./bin/yorkie agent
```

*NOTE: Yorkie uses MongoDB to store it's data. To start MongoDB, `docker-compose -f docker/docker-compose.yml up --build -d` in [the project root](https://github.com/yorkie-team/yorkie).*

Use the `-c` option to change settings such as the MongoDB connectionURI.

```bash
$ ./bin/yorkie agent -c yorkie.json
```

The configuration file, `yorkie.json` with default values is shown below.

```json
{
  "RPC": {
    "Port": 11101,
    "CertFile": "",
    "KeyFile": ""
  },
  "Metrics": {
    "Port": 11102
  },
  "Mongo": {
    "ConnectionTimeoutSec": 5,
    "ConnectionURI": "mongodb://localhost:27017",
    "YorkieDatabase": "yorkie-meta",
    "PingTimeoutSec": 5
  },
  "Backend": {
    "SnapshotThreshold": 500,
    "SnapshotInterval": 100
  }
}
```

