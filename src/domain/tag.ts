import {
  Field,
  ID,
  ObjectType,
  FieldResolver,
  Root,
  Resolver,
} from "type-graphql"
import { Entity, PrimaryColumn, ManyToMany, Column } from "typeorm"
import Note from "./note"
import DataLoader from "dataloader"
import { getNotesFromTag } from "../core/dataloaders"

@Entity()
@ObjectType()
@Resolver(() => Tag)
export default class Tag {
  @PrimaryColumn({ type: "uuid", default: () => "gen_random_uuid()" })
  @Field(() => ID)
  id: string

  @Column({ unique: true })
  @Field()
  name: string

  @ManyToMany(() => Note, (note) => note.tags, { cascade: false })
  @FieldResolver(() => [Note])
  notes(@Root() tag: Tag) {
    const noteLoader = new DataLoader<string, Note[]>((keys) =>
      getNotesFromTag(keys)
    )
    return noteLoader.load(tag.id)
  }
}
