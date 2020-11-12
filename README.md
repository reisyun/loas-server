# Loas

애니메이션을 탐색하고, 나만의 리스트에 기록해서 애니를 추천받을 수 있는 웹앱

## Installation

```bash
$ yarn install
```

_Rename `example.env` to `.env` and modify contents_
<br/>

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Folder Structure

```
   .
    ├── prisma                  # Database configure
    │
    ├── src
    │   ├── app                 # Application interface (presenter)
    │   │   ├── api
    │   │   ├── module
    │   │   └── token
    │   ├── core                # Core service (interactor)
    │   │   ├── common
    │   │   ├── domain
    │   │   └── service
    │   └── infra               # Infrastructure implement
    │       ├── adapter
    │       └── config
    │
    ├── test                    # Unit test
    │  └── unit/core
    │      ├── common
    │      └── domain
    └── ...
```

## Stack

- Typescript
- GraphQL
- NestJS
- Express
- Prisma
