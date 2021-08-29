import { Field, ID, ObjectType, Authorized } from "type-graphql"
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm"
import Tag from "./tag"
import User from "./user"

@Entity()
@ObjectType()
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
  @Field(() => [Tag])
  tags: Tag[]

  @Column()
  ownerId: string

  owner: User
}
