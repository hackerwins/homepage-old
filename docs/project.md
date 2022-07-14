---
title: "Project"
layout: docs
category: "Tasks"
permalink: /docs/project
order: 51
---

## Project

Project represents your service or application in Yorkie. Separate Projects can exist within a single application. You can add more Projects as needed, for example, if you want to manage [auth webhook](/docs/auth-webhook) and documents for specific purposes.

To manage Projects, you can use the `project` subcommand:

```bash
$ yorkie project
Manage projects

Usage:
  yorkie project [command]

Available Commands:
  create      Create a new project
  ls          List all projects

Flags:
  -h, --help   help for project

Use "yorkie project [command] --help" for more information about a command.
```

#### Listing Projects

You can list Projects on the server using `ls`.

```bash
$ yorkie project ls
 NAME     PUBLIC KEY            SECRET KEY            AUTH WEBHOOK URL  AUTH WEBHOOK METHODS  CREATED AT
 default  caes5i3hkdftdruae2tg  caes5i3hkdftdruae2u0                    []                    2 minutes
```

*Server creates a `default project` automatically. If you create a Client without apiKey, the Client is created in the default Project.*

#### Creating a Project

You can create a new Project with a name using `create`.

```bash
$ yorkie project create test-project
{"id":"627c9125d02654d3f0f769d8","name":"test-project","public_key":"c9u9298qp9as73b8i190","secret_key":"c9u9298qp9as73b8i19g","auth_webhook_url":"","auth_webhook_methods":null,"created_at":"2022-05-12T04:46:29.781052056Z"}
```

#### Using Public Key

If you create a Client with `public_key` of the Project as `apiKey`, you can manage the Client in the Project.

```javascript
const client = new yorkie.Client('localhost:8080', {
  apiKey: 'c9u9298qp9as73b8i190', // public_key of the project
});
```
Then Documents attached to the Client are isolated and stored in the Project.
