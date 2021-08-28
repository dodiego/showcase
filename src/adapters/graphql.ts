import { buildSchema } from "type-graphql"
import path from "path"

export function getSchema() {
  return buildSchema({
    resolvers: [path.join(__dirname, "..", "controllers", "*.{ts,js}")],
  })
}
