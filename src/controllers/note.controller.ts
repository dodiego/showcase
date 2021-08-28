import { Mutation, Query, Resolver, Arg } from "type-graphql"
import logger from "../adapters/logger"
import { getQueryBuilder } from "../adapters/typeorm"
import Note from "../domain/note"

@Resolver()
export default class NoteController {
  @Mutation(() => String)
  async add(@Arg("title") title: string, @Arg("text") text: string) {
    const insertResult = await getQueryBuilder()
      .insert()
      .into(Note)
      .values([
        {
          title,
          text,
        },
      ])
      .returning(["id"])
      .execute()
    logger.info("note created")
    return insertResult.identifiers[0].id
  }
  @Mutation(() => Boolean)
  async put(@Arg("id") id: string, @Arg("newText") newText: string) {
    await getQueryBuilder()
      .update(Note)
      .set({ text: newText })
      .where("id = :id", { id })
      .execute()
    logger.info("note updated")
    return true
  }
  @Mutation(() => Boolean)
  async delete(@Arg("id") id: string) {
    await getQueryBuilder()
      .delete()
      .from(Note)
      .where("id = :id", { id })
      .execute()
    logger.info("note deleted")
    return true
  }
  @Query(() => [Note])
  async find(@Arg("filter") filter: string) {
    logger.info("querying notes")
    return getQueryBuilder()
      .from(Note, "note")
      .where("note.text ILIKE :filter", { filter: `%${filter}%` })
      .execute()
  }
}
