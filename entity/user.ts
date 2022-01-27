import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column("varchar", { length: 255 })
  password: string;

  @Column("varchar", { length: 255, nullable: true, default: "0" })
  avatar = "0";
}

export default User;
