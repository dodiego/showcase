import DataLoader from "dataloader"
import {
  Field,
  ID,
  ObjectType,
  Authorized,
  FieldResolver,
  Root,
} from "type-graphql"
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { getTagsFromNote } from "../dataloaders"
import Tag from "./tag"
import User from "./user"
import { Resolver } from "type-graphql"

@Entity()
@ObjectType()
@Resolver(() => Note)
export default class Note {
  @PrimaryColumn({ type: "uuid", default: () => "gen_random_uuid()" })
  @Field(() => ID)
  @Authorized(["admin"])
  id: string

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  text: string

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: false })
  @JoinTable()
  @FieldResolver(() => [Tag])
  tags(@Root() note: Note) {
    const tagLoader = new DataLoader<string, Tag[]>((keys) =>
      getTagsFromNote(keys)
    )
    return tagLoader.load(note.id)
  }

  @Column()
  ownerId: string

  owner: User
}
