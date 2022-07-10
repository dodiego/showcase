import { NoteStructure } from "./note.structure"

export type UserStructure = {
  id: string
  email: string
  password: string
  notes: NoteStructure[]
}
