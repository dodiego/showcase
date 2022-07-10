import { NoteStructure } from "./note.structure"
import { BaseStructure } from "./base.structure"

export type TagStructure = BaseStructure & {
  name: string
  notes: NoteStructure[]
}
