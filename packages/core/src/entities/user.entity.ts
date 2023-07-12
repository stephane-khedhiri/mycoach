import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import {encodePassword} from '../util/password'

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column()
    password: string
    @BeforeInsert()
    public hashPassword(): void {
        this.password = encodePassword(this.password);
    }
}