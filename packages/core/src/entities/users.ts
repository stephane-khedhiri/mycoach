import "reflect-metadata"
import {Column, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import {encodePassword} from '../util/password'

export abstract class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @BeforeInsert()
    public async hashPassword() {
        this.password = encodePassword(this.password);
    }
}