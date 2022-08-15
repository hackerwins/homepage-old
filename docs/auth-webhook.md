---
title: "Auth Webhook"
layout: docs
category: "Tasks"
permalink: /docs/auth-webhook
order: 54
---

## Auth Webhook

A webhook is an HTTP POST that is called when something happens. If the Auth Webhook has been configured, when a Server receives a request from a Client, the Server checks if the Client has been authorized for a certain Document by asking an outside service with a REST request.

This page shows how to set up an Auth Webhook. The overall flow is as follows:

```
(5) response the request  (4) handle the request
     ┌─────────────────┐  ┌──┐
     │                 │  │  │   (3) response
     ▼                 │  ▼  │    - allowed
 ┌──────┐             ┌┴─────┤    - reason   ┌──────────────┐
 │Client├────────────►│Server│◄──────────────┤Outside Server│
 └──────┘ (1)request  └────┬─┘               └──────────────┘
           - token         │                      ▲
           - dockey        └──────────────────────┘
                               (2) call webhook
                                - token
                                - dockey
                                - verb: r or rw
```

### How to implement

First, We need to pass some tokens (that identify users in the service) when creating a Client:

```javascript
const client = new yorkie.Client('localhost:8080', {
  token: SOME_TOKEN,
});
```

This token will be sent to the Server upon every request from the Client.

When running a Server, we can specify an Auth Webhook by the `--authorization-webhook` flag:

```bash
$ yorkie server --authorization-webhook=http://localhost:3000/auth-hook
```

We can also update the auth-webhook-url per project. by the `--auth-webhook-url` flag:

```bash
$ yorkie project [name] --auth-webhook-url http://localhost:3000/auth-hook
```

The Server who receives the token calls the given webhook URL before processing the requests.

Here is an example of the webhook requests:

```javascript
{
  "token": "SOME_TOKEN",          // token passed by the client
  "method": "PushPull",           // method: ActivateClient, DeactivateClient, AttachDocument, DetachDocument, WatchDocuments
  documentAttributes: [{
    key: "DOCUMENT_KEY",          // document key
    verb: "r"                     // 'r' or 'rw'
  }]
}
```

The outside server should respond like this:

```javascript
{
  "allowed": true, // or false if the given token is not authorized for this document.
  "reason": "ok"   // [optional] reason for this response.
}
```

If the server receives a response with `allowed: true` from the outside server, it handles the request normally, otherwise it sends the `codes.Unauthenticated` error to the client.
