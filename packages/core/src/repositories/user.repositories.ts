import type {DataSource} from "typeorm"
import * as uuid from 'uuid'
import {UserEntity} from "../entities/user.entity";
import {CreateUserDto} from "../dto/coach/create.user.dto";



export class UserRepository {
    constructor(private readonly db: DataSource ) {}


    public async users() {
        try {
            await this.db.initialize()
            return  this.db.getRepository(UserEntity).find()
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }

    public async userById(id: string) {
        try {
            await this.db.initialize()
            return this.db.getRepository(UserEntity)
                .createQueryBuilder("user")
                .where("user.id = CAST(:id AS UUID)", { id })
                .getOne()
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async userByEmail(email: string) {
        try {
            await this.db.initialize()
            return this.db.getRepository(UserEntity).findOneBy( {email: email})
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async create(user: CreateUserDto){
        try {
            await this.db.initialize()
            const userEntity = this.db.getRepository(UserEntity).create(user)
            return  this.db.getRepository(UserEntity).save(userEntity)
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}

