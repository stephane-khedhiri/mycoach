import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string
}