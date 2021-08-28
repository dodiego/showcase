import { Mutation, Query, Resolver } from "type-graphql"
import Note from "../domain/note"

@Resolver()
export default class NoteController {
  @Mutation()
  async add(title: string, text: string): Promise<string> {
    return ""
  }
  @Mutation()
  async put(id: string, newText: string): Promise<boolean> {
    return true
  }
  @Mutation()
  async delete(id: string): Promise<boolean> {
    return true
  }
  @Query()
  async find(filter: string): Promise<Note[]> {
    return []
  }
}
