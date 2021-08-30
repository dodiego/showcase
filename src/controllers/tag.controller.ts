import { Resolver, Mutation, Arg, Authorized } from "type-graphql"
import { getQueryBuilder } from "../adapters/typeorm.adapter"
import Tag from "../domain/tag.domain"

@Resolver()
export default class TagController {
  @Mutation(() => Boolean, { name: "addTag" })
  @Authorized()
  async add(@Arg("name") name: string) {
    await getQueryBuilder().insert().into(Tag).values({ name }).execute()
    return true
  }
}
