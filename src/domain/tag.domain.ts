import { Field, ID, ObjectType, Root } from "type-graphql"
import { Entity, PrimaryColumn, ManyToMany, Column } from "typeorm"
import Note from "./note.domain"
import DataLoader from "dataloader"
import { getNotesFromTag } from "../cache/dataloaders.cache"

@Entity()
@ObjectType()
export default class Tag {
  @PrimaryColumn({ type: "uuid", default: () => "gen_random_uuid()" })
  @Field(() => ID)
  id: string

  @Column({ unique: true })
  @Field()
  name: string

  @ManyToMany(() => Note, (note) => note.tags, { cascade: false })
  @Field(() => [Note])
  notes(@Root() tag: Tag) {
    const noteLoader = new DataLoader<string, Note[]>((keys) =>
      getNotesFromTag(keys)
    )
    return noteLoader.load(tag.id)
  }
}
