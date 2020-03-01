---
layout: docs
---

## Quick Start

For now, we didn't deploy binary yet. So you should [compile Yorkie yourself](#developing-yorkie).

Yorkie uses MongoDB to store it's data. To start MongoDB, type `docker-compose up`.

Next, let's start a Yorkie agent. Agent runs until they're told to quit and handle the communication of maintenance tasks of Agent. and start the agent:

```
$ ./bin/yorkie agent
```

Use the -c option to change settings such as the MongoDB connectionURI.

```
$ ./bin/yorkie agent -c yorkie.json
```

The configuration file with default values ​​is shown below.

```
# yorkie.json
{
   "RPCPort":9090,
   "Mongo":{
      "ConnectionURI":"mongodb://mongo:27017",
      "ConnectionTimeoutSec":5,
      "PingTimeoutSec":5,
      "YorkieDatabase":"yorkie-meta"
   }
}
```

### Developing Yorkie

For building Yorkie, You'll first need [Go](https://golang.org) installed (version 1.13+ is required). Make sure you have Go properly [installed](https://golang.org/doc/install), including setting up your [GOPATH](https://golang.org/doc/code.html#GOPATH).

Next, clone this repository into some local directory and then just type `make build`. In a few moments, you'll have a working `yorkie` executable:
```
$ make
...
$ bin/yorkie
```

Tests can be run by typing `make test`.

*NOTE: `make test` includes integration tests that require a local MongoDB listen on port 27017. To start MongoDB, type `docker-compose up`.*

If you make any changes to the code, run `make fmt` in order to automatically format the code according to Go [standards](https://golang.org/doc/effective_go.html#formatting).
