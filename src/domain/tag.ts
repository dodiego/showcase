import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryColumn, ManyToMany, Column } from "typeorm"
import Note from "./note"

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
  notes: Note[]
}
