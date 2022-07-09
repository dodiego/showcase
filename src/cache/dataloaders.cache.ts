import { getQueryBuilder } from "../adapters/typeorm.adapter"
import Tag from "../core/structures/tag.structure"
import Note from "../core/structures/note.structure"

export async function getNotesFromTag(tagIds: readonly string[]) {
  return Promise.all(
    tagIds.map((tagId) =>
      getQueryBuilder().relation(Tag, "notes").of(tagId).loadMany()
    )
  )
}

export async function getTagsFromNote(noteIds: readonly string[]) {
  return Promise.all(
    noteIds.map((noteId) =>
      getQueryBuilder().relation(Note, "tags").of(noteId).loadMany()
    )
  )
}
