import type {DataSource, SelectQueryBuilder} from "typeorm"
import {CoachEntity} from "../entities/coach.entity";
import {CreateCoachDto} from "../dto/coach/create.coach.dto";
import {OfferStatus} from "../entities/offer.entity";


export class CoachRepository {
    constructor(private readonly db: DataSource) {
    }


    public async coachsWithOffers(selects?: SelectQueryBuilder<CoachEntity>['selects']) {

        try {
            await this.db.initialize()
            if (!selects) {
                return this.db.getRepository(CoachEntity)
                    .createQueryBuilder('coach')
                    .getMany()
            }
            return this.db.getRepository(CoachEntity).find({
                relations: {offers: true},
                select: {
                    offers: {id: true}
                },
                where: {offers: {status: OfferStatus.ACTIVE}}
            })
        } catch (err) {
            throw err
        } finally {
            if (this.db.isInitialized) {
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
                .where("coach.id = :id", {id})
                .getOne()
        } catch (err) {
            throw err
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    public async userByEmail(email: string) {
        try {
            await this.db.initialize()
            return this.db.getRepository(CoachEntity).findOneBy({email: email})
        } catch (err) {
            throw err
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    public async create(coach: CreateCoachDto) {
        try {
            await this.db.initialize()
            const userEntity = this.db.getRepository(CoachEntity).create(coach)
            return this.db.getRepository(CoachEntity).save(userEntity)
        } catch (err) {
            throw err
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    public async update(id: string, data: Partial<CoachEntity>) {
        try {

            await this.db.initialize()
            const coach = this.db.getRepository(CoachEntity).findOne({where: {id}})
            return this.db.getRepository(CoachEntity).save(Object.assign(coach, data))
        } catch (err) {
            throw err
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }
}

