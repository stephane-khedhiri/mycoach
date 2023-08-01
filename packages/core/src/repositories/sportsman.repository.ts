import {DataSource, SelectQueryBuilder} from "typeorm";
import {SportsmenEntity} from "../entities/sportsmen.entity";
import {CoachEntity} from "../entities/coach.entity";

export class SportsmanRepository {
    constructor(private readonly db: DataSource) {}

    public async create(sportsman : {email: string}){
        try{
            await this.db.initialize()
            const sportsmanEntity = this.db.getRepository(SportsmenEntity).create(sportsman)
            return this.db.getRepository(SportsmenEntity).save(sportsmanEntity)
        }catch (e) {
            throw e
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async sportsmanByEmail (email: string, selects?: SelectQueryBuilder<CoachEntity>['selects']){
        try{
            await this.db.initialize()
            if(!selects){
                return this.db.getRepository(SportsmenEntity)
                    .createQueryBuilder('s')
                    .select()
                    .where('s.email = :email', {email})
                    .getOne()
            }
            return this.db.getRepository(SportsmenEntity)
                .createQueryBuilder('s')
                .select(selects.map(select => `s.${select}`))
                .where('s.email = :email', {email})
                .getOne()
        }catch (e) {
            throw e
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}