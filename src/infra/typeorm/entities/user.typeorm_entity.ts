import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { BaseTypeOrmEntity } from "./base.typeorm_entity"
import { UserStructure } from "../../../core/structures/user.structure"
import { NoteTypeOrmEntity } from "./note.typeorm_entity"

@Entity()
export default class UserTypeOrmEntity
  extends BaseTypeOrmEntity
  implements UserStructure
{
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => NoteTypeOrmEntity, (note) => note.owner)
  notes: NoteTypeOrmEntity[]
}
