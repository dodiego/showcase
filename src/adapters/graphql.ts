import { buildSchema } from "type-graphql"
import path from "path"
import logger from "./logger"

export function getSchema() {
  return buildSchema({
    resolvers: [path.join(__dirname, "..", "controllers", "*.{ts,js}")],
    authChecker: ({ root, args, context, info }, _roles) => {
      logger.info("root", root)
      logger.info("args", args)
      logger.info("context", context)
      logger.info("info", info)

      return true // or false if access is denied
    },
  })
}
