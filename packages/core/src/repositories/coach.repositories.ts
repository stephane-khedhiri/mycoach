import type {DataSource, SelectQueryBuilder} from "typeorm"
import {CoachEntity} from "../entities/coach.entity";
import {CreateCoachDto} from "../dto/coach/create.coach.dto";



export class CoachRepository {
    constructor(private readonly db: DataSource ) {}


    public async users(selects?: SelectQueryBuilder<CoachEntity>['selects']) {

        try {
            await this.db.initialize()
            if(!selects){
                return  this.db.getRepository(CoachEntity)
                    .createQueryBuilder('coach')
                    .getMany()
            }
            return  this.db.getRepository(CoachEntity)
                .createQueryBuilder('user')
                .select(selects.map(select => `coach.${select}`))
                .getMany()
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }

    public async userById(id: string, selects: SelectQueryBuilder<CoachEntity>['selects']) {
        try {
            await this.db.initialize()
            return this.db.getRepository(CoachEntity)
                .createQueryBuilder("coach")
                .select(selects.map(select => `coach.${select}`)) // add query builder "user" exemple return user.id
                .where("coach.id = :id", { id })
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
            return this.db.getRepository(CoachEntity).findOneBy( {email: email})
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
            return await this.db.getRepository(CoachEntity).createQueryBuilder('c').where('c.email = :email', {email}).getCount()
        }catch (err) {}
        finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async create(coach: CreateCoachDto){
        try {
            await this.db.initialize()
            const userEntity = this.db.getRepository(CoachEntity).create(coach)
            return  this.db.getRepository(CoachEntity).save(userEntity)
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async update(coach: CoachEntity){
        try{
            await this.db.initialize()
            const userEntity = this.db.getRepository(CoachEntity).create(coach)
            return this.db.getRepository(CoachEntity).save(userEntity)
        }catch (err){
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}

