import {Column, PrimaryGeneratedColumn, BeforeInsert, } from "typeorm";
import {encodePassword} from '../util/password'

export abstract class UserEntity{
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