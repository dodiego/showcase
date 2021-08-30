# Note taking backend app



## Getting Started

- clone the repository

- install npm dependencies using [pnpm](https://pnpm.io/)

- run with `npm start`

  

## Architecture

- Layers

  - domain: domain definitions with [TypeGraphQL](https://typegraphql.com/) and [TypeORM](typeorm.io/) annotations

  - controllers:  domain access implementations

  - core: application configuration and context definitions

  - adapters: interface between the app and external libraries 

  - auth: RBAC definitions using [Casl](https://casl.js.org/v5/en/guide/intro)

  - cache: Dataloder implementations

    

## Tech Stack

- ORM - [TypeORM](typeorm.io/)

- HTTP Server - [Express](https://expressjs.com/)

- GraphQL

  - [Apollo](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express)
  - [TypeGraphQL](https://typegraphql.com/)

- Caching - [Dataloader](https://github.com/graphql/dataloader)

- JWT Authentication - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

- RBAC Authorization - [Casl](https://casl.js.org/v5/en/guide/intro)

- Password hashing - [argon2](https://github.com/ranisalt/node-argon2#readme)

- Logger - [pino](https://getpino.io/#/)

  

