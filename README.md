# yorkie-homepage

[![Netlify Status](https://api.netlify.com/api/v1/badges/2534f872-6288-4609-9984-826f9c5af7a9/deploy-status)](https://app.netlify.com/sites/yorkie/deploys)

## Layout

The homepage is deployed to AWS and the configuration is shown below. This repository is used to distribute static pages.

```
[Route53]
 ㄴ yorkie.dev - [gh-pages]        # for serving static pages
 ㄴ api.yorkie.dev - [ELB] - [EC2] # for serving API

# EC2
[nginx] - [grpc-web proxy, envoy] - [yorkie server] - [mongodb]
```

## Build

Yorkie Homepage uses Jekyll.

```
$ bundle install
$ bundle exec jekyll s
```

And connect http://localhost:4000 via web browsers.
