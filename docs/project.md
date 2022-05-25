---
title: "Project"
layout: docs
category: "Tasks"
permalink: /docs/project
order: 51
---

### Project

Project represents your service or application in Yorkie. For example, you might have separate projects for your application.

You can create a project for a service  when you first start using Yorkie. You can add more projects on an as-needed basis, for example, if you want to manage [auth webhook](/docs/auth-webhook) and documents.

*Server creates a `default project` automatically. If you create a client without apiKey, the client is created in the default project.*

To manage projects you can use the `project` subcommand:

```bash
$ yorkie project
Manage projects

Usage:
  yorkie project [command]

Available Commands:
  create      Create a new project
  list        List all projects

Flags:
  -h, --help   help for project

Use "yorkie project [command] --help" for more information about a command.
```

#### Creating a project

You can create a new project with its name using `create`.

```bash
$ yorkie project create test-project
{"id":"627c9125d02654d3f0f769d8","name":"test-project","public_key":"c9u9298qp9as73b8i190","secret_key":"c9u9298qp9as73b8i19g","auth_webhook_url":"","auth_webhook_methods":null,"created_at":"2022-05-12T04:46:29.781052056Z"}
```

#### Using Public Key

If you create a client with `public_key` of the project as `apiKey`, you can manage the client in the project.

```javascript
const client = new yorkie.Client('localhost:8080', {
  apiKey: 'c9u9298qp9as73b8i190', // public_key of the project
});
```
