import { Mutation, Query, Resolver, Arg, Authorized, Ctx } from "type-graphql"
import logger from "../adapters/logger"
import { getQueryBuilder, getRepository } from "../adapters/typeorm"
import Context from "../context"
import Note from "../domain/note"
import Tag from "../domain/tag"

@Resolver()
export default class NoteController {
  private readonly noteRepository = getRepository(Note)
  private readonly tagRepository = getRepository(Tag)

  @Mutation(() => String, { name: "addNote" })
  @Authorized()
  async add(
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() context: Context
  ) {
    const insertResult = await getQueryBuilder()
      .insert()
      .into(Note)
      .values([
        {
          title,
          text,
          ownerId: context.userId,
        },
      ])
      .returning(["id"])
      .execute()
    logger.info("note created")
    return insertResult.identifiers[0].id
  }

  @Mutation(() => Boolean, { name: "updateNote" })
  @Authorized()
  async put(@Arg("id") id: string, @Arg("newText") newText: string) {
    await getQueryBuilder()
      .update(Note)
      .set({ text: newText })
      .where("id = :id", { id })
      .execute()
    logger.info("note updated")
    return true
  }

  @Mutation(() => Boolean, { name: "deleteNote" })
  @Authorized()
  async delete(@Arg("id") id: string) {
    await getQueryBuilder()
      .delete()
      .from(Note)
      .where("id = :id", { id })
      .execute()
    logger.info("note deleted")
    return true
  }

  @Mutation(() => Boolean, { name: "tagNote" })
  @Authorized()
  async tag(@Arg("noteId") noteId: string, @Arg("tag") tagName: string) {
    const note = await this.noteRepository.findOne(noteId)
    if (!note) {
      throw new Error(`Invalid note id: ${noteId}`)
    }

    const tag = await this.tagRepository.findOne({ name: tagName })

    if (!tag) {
      throw new Error(`Invalid tag name: ${tagName}`)
    }

    await getQueryBuilder().relation(Note, "tags").of(note).add(tag)
    return true
  }

  @Query(() => [Note], { name: "findNotes" })
  async find(@Arg("filter") filter: string) {
    logger.info("querying notes")
    return getQueryBuilder()
      .from(Note, "note")
      .where("note.text ILIKE :filter", { filter: `%${filter}%` })
      .execute()
  }
}
