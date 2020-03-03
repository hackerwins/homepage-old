---
layout: docs
---

## Commands (CLI)

Yorkie is controlled via a very easy to use command-line interface (CLI). Yorkie is only a single command-line application: `yorkie`. This application then takes a subcommand such as `agent`.

The yorkie CLI is a well-behaved command line application. In erroneous cases, a non-zero exit status will be returned. It also responds to -h and --help as you'd most likely expect.

To view a list of the available commands at any time, just run `yorkie` with no arguments:

```bash
$ yorkie

Usage:
  yorkie [command]

Available Commands:
  agent       Starts yorkie agent.
  help        Help about any command

Flags:
  -h, --help   help for yorkie

Use "yorkie [command] --help" for more information about a command.
```

To get help for any specific command, pass the -h flag to the relevant subcommand. For example, to see help about the members subcommand:

```bash
$ yorkie agent -h
Starts yorkie agent.

Usage:
  yorkie agent [options] [flags]

Flags:
  -c, --config string   config path
  -h, --help            help for agent
```
