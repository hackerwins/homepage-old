---
title: "Monitoring Agent"
layout: docs
category: "Tasks"
permalink: /docs/monitoring-agent
order: 54
---

## Monitoring Agent

This page describes how to monitor the Agent.

Agent exports metrics under the `/metrics` path on its profiling port.
The metrics can be fetched with curl:

```bash
$ curl http://localhost:11102/metrics

yorkie_agent_version{agent_version="{{site.version}}"} 1
# HELP yorkie_pushpull_received_changes_total The total count of changes included
# TYPE yorkie_pushpull_received_changes_total counter
yorkie_pushpull_received_changes_total 6
...
```

This metrics can be collected from [Prometheus](https://prometheus.io/).

### Prometheus and Grafana

Running [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/oss/grafana/) is the easiest way to monitor Agent's metrics.

First, downloads all manifests files from [docker folder](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker). Then let's start the applications with `docker-compose`:

```bash
$ docker-compose -f docker-compose-monitoring.yml up --build -d

Creating prometheus ... done
Creating grafana    ... done
```

Now Prometheus will collect Agent metrics every 10 seconds.

Grafana has built-in Prometheus support; just add a Prometheus data source:

```
Name:   prometheus
Type:   Prometheus
Url:    http://localhost:9090
Access: proxy
```

Then import the [default yorkie dashboard template](https://github.com/yorkie-team/yorkie-team.github.io/tree/main/docker/yorkie-dashboard.json) and customize. For instance, if Prometheus data source name is `my-prometheus`, the datasource field values in JSON also need to be `my-prometheus`.

Sample dashboard:

<img src="/images/dashboard.png" width="100%" style="max-width:600px">
