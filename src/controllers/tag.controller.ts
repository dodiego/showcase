import { Resolver, Mutation, Arg } from "type-graphql"
import { getQueryBuilder } from "../adapters/typeorm"
import Tag from "../domain/tag"

@Resolver()
export default class TagController {
  @Mutation(() => Boolean, { name: "addTag" })
  async add(@Arg("name") name: string) {
    await getQueryBuilder().insert().into(Tag).values({ name }).execute()
    return true
  }

  @Mutation(() => Boolean, { name: "deleteTag" })
  async remove(@Arg("name") name: string) {
    await getQueryBuilder()
      .delete()
      .from(Tag)
      .where("name = :name", { name })
      .execute()
    return true
  }
}
