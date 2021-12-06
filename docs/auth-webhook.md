---
title: "Auth Webhook"
layout: docs
category: "Tasks"
order: 6
---

## Auth Webhook

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

If the agent receives a response with `allowed: true` from the outside server, it handles the request normally, otherwise it response an error with `codes.Unauthenticated` to the client.
