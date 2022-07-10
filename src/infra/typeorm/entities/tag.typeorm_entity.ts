import { Entity, ManyToMany, Column } from "typeorm"
import { NoteTypeOrmEntity } from "./note.typeorm_entity"
import { TagStructure } from "../../../core/structures/tag.structure"
import { BaseTypeOrmEntity } from "./base.typeorm_entity"

@Entity()
export default class TagTypeOrmEntity
  extends BaseTypeOrmEntity
  implements TagStructure
{
  @Column({ unique: true })
  name: string

  @ManyToMany(() => NoteTypeOrmEntity, (note) => note.tags, { cascade: false })
  notes: NoteTypeOrmEntity[]
}
