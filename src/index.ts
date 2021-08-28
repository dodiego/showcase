import "reflect-metadata"
import * as typeorm from "./adapters/typeorm"
import logger from "./adapters/logger"
import { getSchema } from "./adapters/graphql"
import { ApolloServer } from "apollo-server"

async function run() {
  logger.info("connecting to database")
  await typeorm.init()
  logger.info("database connected")

  const schema = await getSchema()
  const server = new ApolloServer({
    schema,
  })
  const response = await server.listen()
  logger.info(`Server listening at ${response.url}`)
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
