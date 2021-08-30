import { buildSchema } from "type-graphql"
import TagController from "../controllers/tag.controller"
import NoteController from "../controllers/note.controller"
import UserController from "../controllers/user.controller"

export function getSchema() {
  return buildSchema({
    resolvers: [TagController, NoteController, UserController],

    authChecker: ({ context }) => {
      return !!context.userId
    },
  })
}
