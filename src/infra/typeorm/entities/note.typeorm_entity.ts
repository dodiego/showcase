import { BaseTypeOrmEntity } from "./base.typeorm_entity"
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm"
import { NoteStructure } from "../../../core/structures/note.structure"
import { UserStructure } from "../../../core/structures/user.structure"
import TagTypeOrmEntity from "./tag.typeorm_entity"
import UserTypeOrmEntity from "./user.typeorm_entity"

@Entity("notes")
export class NoteTypeOrmEntity
  extends BaseTypeOrmEntity
  implements NoteStructure
{
  @Column({ name: "text", type: "text" })
  text: string

  @Column({ name: "title", type: "varchar" })
  title: string

  @ManyToOne(() => UserTypeOrmEntity)
  owner: UserTypeOrmEntity

  @ManyToMany(() => TagTypeOrmEntity)
  tags: TagTypeOrmEntity[]
}
