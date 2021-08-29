import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import * as typeorm from "./adapters/typeorm"
import logger from "./adapters/logger"
import { getSchema } from "./adapters/graphql"

import express from "express"
import config from "./config"

async function run() {
  await typeorm.init()
  const app = express()
  const schema = await getSchema()
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (req.headers.authorization) {
        return jwt.verify(req.headers.authorization, config.secret)
      }
      return false
    },
  })
  await server.start()
  server.applyMiddleware({ app, path: "/graphql" })
  app.listen(config.serverPort, () => {
    logger.info(`Server listening at port ${config.serverPort}`)
  })
}

process.on("SIGINT", async () => {
  await typeorm.disconnect()
  logger.info("graceful exit")
  process.exit(0)
})

process.on("unhandledRejection", (reason: Error) => {
  logger.error(reason)
  process.exit(2)
})

run().catch(async (e) => {
  logger.error(e)
  await typeorm.disconnect()
  process.exit(1)
})
