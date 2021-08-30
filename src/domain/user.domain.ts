import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class User {
  @PrimaryColumn({ type: "uuid", default: () => "gen_random_uuid()" })
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}
