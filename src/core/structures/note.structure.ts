import { TagStructure } from "./tag.structure"
import { UserStructure } from "./user.structure"
import { BaseStructure } from "./base.structure"

export type NoteStructure = BaseStructure & {
  title: string
  text: string
  tags?: TagStructure[]
  owner: UserStructure
}
