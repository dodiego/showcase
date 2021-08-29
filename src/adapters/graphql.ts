import { buildSchema } from "type-graphql"
import path from "path"
import logger from "./logger"

export function getSchema() {
  return buildSchema({
    resolvers: [path.join(__dirname, "..", "controllers", "*.{ts,js}")],
    authChecker: ({ context }) => {
      logger.info("context", context)
      return true
    },
  })
}
