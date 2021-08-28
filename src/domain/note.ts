import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm"
import Tag from "./tag"

@Entity({ name: "notes" })
@ObjectType()
export default class Note {
  @PrimaryColumn({ type: "uuid" })
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
  @Field(() => [Tag])
  tags: Tag[]
}
