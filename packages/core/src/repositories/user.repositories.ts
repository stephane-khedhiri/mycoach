import type {DataSource, SelectQueryBuilder} from "typeorm"
import {UserEntity} from "../entities/user.entity";
import {CreateUserDto} from "../dto/coach/create.user.dto";



export class UserRepository {
    constructor(private readonly db: DataSource ) {}


    public async users(selects?: SelectQueryBuilder<UserEntity>['selects']) {

        try {
            await this.db.initialize()
            if(!selects){
                return  this.db.getRepository(UserEntity)
                    .createQueryBuilder('user')
                    .getMany()
            }
            return  this.db.getRepository(UserEntity)
                .createQueryBuilder('user')
                .select(selects.map(select => `user.${select}`))
                .getMany()
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }

    public async userById(id: string, selects: SelectQueryBuilder<UserEntity>['selects']) {
        try {
            await this.db.initialize()
            return this.db.getRepository(UserEntity)
                .createQueryBuilder("user")
                .select(selects.map(select => `user.${select}`)) // add query builder "user" exemple return user.id
                .where("user.id = :id", { id })
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

    public async existByEmail(email: string) {
        try {
            await this.db.initialize()
            return await this.db.getRepository(UserEntity).createQueryBuilder('c').where('c.email = :email', {email}).getCount()
        }catch (err) {}
        finally {
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
    public async update(user: UserEntity){
        try{
            await this.db.initialize()
            const userEntity = this.db.getRepository(UserEntity).create(user)
            return this.db.getRepository(UserEntity).save(userEntity)
        }catch (err){
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}

