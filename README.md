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
    ├── test                    # Test code
    │   └── unit/core
    │       ├── common
    │       └── domain
    └── ...
```

## Layer

- `Domain`: 애그리게잇을 정의하고, `UseCase`와 `Handler`의 인터페이스를 정의한다.
- `Service`: 애그리게잇의 `UseCase`와 `Handler`의 트랜잭션을 관리한다.
- `Application`: DI를 관리하고, `UseCase`를 API에 연결한다.
- `Infrastructure`: 어댑터를 구현하고, 외부 기능을 연결 및 구현한다.

## Stack

- Typescript
- GraphQL
- NestJS
- Express
- Prisma
