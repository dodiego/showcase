import { Mutation, Query, Resolver, Arg, Ctx, Authorized } from "type-graphql"
import logger from "../adapters/logger.adapter"
import { getQueryBuilder, getRepository } from "../adapters/typeorm.adapter"
import Context from "../core/context.core"
import Note from "../domain/note.domain"
import Tag from "../domain/tag.domain"
import { getUserPermissions } from "../auth/user.auth"
import { checkPermissions } from "../auth/base.auth"

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
      .values({
        title,
        text,
        ownerId: context.userId,
      })
      .execute()
    logger.info("note created")
    return insertResult.identifiers[0].id
  }

  @Mutation(() => Boolean, { name: "updateNote" })
  @Authorized()
  async put(
    @Arg("id") id: string,
    @Arg("newText") newText: string,
    @Ctx() context: Context
  ) {
    const note = await getRepository(Note).findOne(id)
    const permissions = getUserPermissions(context.userId)
    checkPermissions(permissions, "update", note)

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
  async delete(@Arg("id") id: string, @Ctx() context: Context) {
    const note = await getRepository(Note).findOne(id)
    const permissions = getUserPermissions(context.userId)
    checkPermissions(permissions, "delete", note)

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
  async tag(
    @Arg("noteId") noteId: string,
    @Arg("tagName") tagName: string,
    @Ctx() context: Context
  ) {
    const note = await this.noteRepository.findOne(noteId)
    if (!note) {
      throw new Error(`Invalid note id: ${noteId}`)
    }

    const permissions = getUserPermissions(context.userId)
    checkPermissions(permissions, "delete", note)

    const tag = await this.tagRepository.findOne({ name: tagName })

    if (!tag) {
      throw new Error(`Invalid tag name: ${tagName}`)
    }

    await getQueryBuilder().relation(Note, "tags").of(note).add(tag)
    return true
  }

  @Query(() => [Note], { name: "findNotes" })
  @Authorized()
  async find(@Arg("filter") filter: string) {
    logger.info("querying notes")
    return getQueryBuilder()
      .from(Note, "note")
      .where("note.text ILIKE :filter", { filter: `%${filter}%` })
      .execute()
  }
}
