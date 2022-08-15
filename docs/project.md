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
  update      Update a project

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

#### Update a Project

You can update a Project on the server using `update`.

```
Usage:
  yorkie project update [name] [flags]

Examples:
yorkie project update name [options]

Flags:
      --auth-webhook-url string   authorization-webhook update url
  -h, --help                      help for update
      --name string               new project name
```

You can update auth-webhook-url of project with `--auth-webhook-url`.
```bash
$ yorkie project update test-project --auth-webhook-url http://localhost:3000/webhook
{"id":"62ebf466275b244d0d6e0cca","name":"test-project","auth_webhook_url":"http://localhost:3000/webhook","auth_webhook_methods":null,"public_key":"cblv8plcefo85rbk33fg","secret_key":"cblv8plcefo85rbk33g0","created_at":"2022-08-04T16:31:34.909Z","updated_at":"2022-08-11T14:51:20.734Z"}
```

You can update name of project with `--name`.
```bash
$ yorkie project update test-project --name new-test-project
{"id":"62ebd31611e0a0e31cceee6a","name":"new-test-project","auth_webhook_url":"http://localhost:3000/webhook","auth_webhook_methods":["AttachDocument","WatchDocuments"],"public_key":"cblt65lcefodjh0aeakg","secret_key":"cblt65lcefodjh0aeal0","created_at":"2022-08-04T14:09:26.623Z","updated_at":"2022-08-11T14:58:22.11Z"}
```

#### Using Public Key

If you create a Client with `public_key` of the Project as `apiKey`, you can manage the Client in the Project.

```javascript
const client = new yorkie.Client('localhost:8080', {
  apiKey: 'c9u9298qp9as73b8i190', // public_key of the project
});
```
Then Documents attached to the Client are isolated and stored in the Project.
