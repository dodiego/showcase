import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm"
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
  @ManyToMany(() => Tag)
  @Field(() => [Tag])
  tags: Tag[]
}
