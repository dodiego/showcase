import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryColumn, ManyToMany, Column } from "typeorm"
import Note from "./note"

@Entity({ name: "tags" })
@ObjectType()
export default class Tag {
  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  id: string
  @Column()
  @Field()
  name: string
  @ManyToMany(() => Note, (note) => note.tags, { cascade: false })
  @Field(() => [Note])
  notes: Note[]
}
