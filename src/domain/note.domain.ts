import DataLoader from "dataloader"
import { Field, ID, ObjectType, Root } from "type-graphql"
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { getTagsFromNote } from "../cache/dataloaders.cache"
import Tag from "./tag.domain"
import User from "./user.domain"

@Entity()
@ObjectType()
export default class Note {
  @PrimaryColumn({ type: "uuid", default: () => "gen_random_uuid()" })
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  text: string

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: false })
  @JoinTable()
  @Field(() => [Tag], { name: "tags" })
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
