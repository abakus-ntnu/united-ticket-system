# United Ticket System

A system for sending out QR-tickets to a list of attendees.

## Frontend

### Setup

Create a local .env file using the .env.example file

```bash
$ cd frontend/
$ yarn install
```

### Run

```bash
$ cd frontend/
$ yarn dev
```

## API

### Setup

Create a local .env file using the .env.example file

```bash
$ cd api/
$ docker-compose up -d
$ yarn install
$ yarn prisma generate
$ yarn prisma db push
```

### Run

```bash
$ cd api/
$ yarn dev
```

### Open Prisma Studio (database tool)

```bash
$ cd api/
$ yarn prisma studio
```
