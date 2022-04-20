# United Ticket System

A system for creating and sending out QR tickets by email.

## Setup

Populate a local .env using .env.example

```bash
$ docker-compose up -d
$ yarn install
$ yarn prisma generate
$ yarn prisma db push
```

## Run the dev server

```bash
$ yarn dev
```

## Open Prisma Studio (database tool)

```bash
yarn prisma studio
```
