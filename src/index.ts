import "reflect-metadata"
import * as typeorm from "./adapters/typeorm.adapter"
import logger from "./adapters/logger.adapter"
import { getSchema } from "./adapters/graphql.adapter"

import express from "express"
import config from "./core/config.core"
import getApolloServer from "./adapters/apollo.adapter"

async function run() {
  await typeorm.init()

  const app = express()
  const schema = await getSchema()
  const apolloServer = getApolloServer(schema)

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: "/graphql" })
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

process.on("uncaughtException", (error) => {
  logger.error(error)
  process.exit(2)
})

run().catch(async (e) => {
  logger.error(e)
  await typeorm.disconnect()
  process.exit(1)
})
