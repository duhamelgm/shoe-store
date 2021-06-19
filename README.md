# Submission to Shoe Store

## Implemented Features

These are the feature that were implemented:

- Event driven system using sidekiq and elasticsearch to process the events coming from the stores
- Real time dashboard using React + Typescript with GraphQL and standard REST
- Metrics using Elasticsearch aggregations

## Getting Started

All the services are available in multiple docker images

```
docker-compose build
docker-compose run server rails db:create db:migrate
```

And then

```
docker-compose up
```

There're a couple of seeds that we need to run, but we need to wait until elasticsearch finishes initializing, once everything is running we can run

```
docker-compose run server rails db:seed
```
