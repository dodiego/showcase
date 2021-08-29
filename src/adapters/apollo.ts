import { GraphQLSchema } from "graphql"
import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import config from "../config"

export default function getApolloServer(schema: GraphQLSchema) {
  return new ApolloServer({
    schema,
    introspection: true,
    context: ({ req }) => {
      if (req.headers.authorization) {
        return jwt.verify(req.headers.authorization, config.secret)
      }
      return false
    },
  })
}
