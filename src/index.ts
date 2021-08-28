import * as typeorm from "./adapters/typeorm"
import logger from "./adapters/logger"

async function run() {
  logger.info("connecting to database")
  await typeorm.init()
  logger.info("database connected")
}

process.on("unhandledRejection", (reason: Error) => {
  logger.error(reason)
  process.exit(2)
})

run()
  .then(async () => {
    logger.info("Gracefully exiting")
    await typeorm.disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    logger.error(e)
    await typeorm.disconnect()
    process.exit(1)
  })
