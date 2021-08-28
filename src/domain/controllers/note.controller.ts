import { Resolver } from "type-graphql"
import Note from "../definitions/note"

@Resolver()
export default class NoteController {
  async add(title: string, text: string): Promise<string> {
    return ""
  }
  async put(id: string, newText: string): Promise<boolean> {
    return true
  }
  async delete(id: string): Promise<boolean> {
    return true
  }
  async find(filter: string): Promise<Note[]> {
    return []
  }
}
