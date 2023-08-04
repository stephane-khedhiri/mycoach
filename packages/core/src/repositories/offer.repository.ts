import {DataSource, SelectQueryBuilder} from "typeorm";
import {OfferEntity} from "../entities/offer.entity";
import {CoachEntity} from "../entities/coach.entity"
import {OfferNotFound} from "../error/errors";
import {CreateOfferDto} from "../dto/offer/create.offer.dto";

export class OfferRepository {
    constructor(private readonly db: DataSource) {}

    // get all offers
    public async offers(selects?: SelectQueryBuilder<OfferEntity>['selects']) {
        try {
            await this.db.initialize()
            if(!selects){
                return this.db.getRepository(OfferEntity)
                    .createQueryBuilder('offer')
                    .select()
                    .getMany()
            }
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('offer')
                .select(selects.map(select => `offer.${select}`))
                .getMany()
        }catch (e) {

        }finally {
            if(this.db.isInitialized){
               await this.db.destroy()
            }
        }
    }
    public async offersByCoach(coachId: string) {
        try {
            await this.db.initialize()
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('o')
                .where('o.coachId = :coachId', {coachId})
                .andWhere('o.status = :status', {status:'ACTIVE'})
                .getMany()
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    // get offers by id
    public async offerById(id: string, selects?: SelectQueryBuilder<OfferEntity>['selects']) {
        try {
            await this.db.initialize()
            // select all by default
            if(!selects){
                return this.db.getRepository(OfferEntity)
                    .createQueryBuilder('offer')
                    .where('offer.id = :id', {id})
                    .getOne()
            }
            // select defined
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('offer')
                .select(selects.map(select => ''))
                .where('offer.id = :id', {id})
                .getOne()
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    // get offer by id with coach
    public async offerByIdWithCoach(id: string, selects?: SelectQueryBuilder<OfferEntity>['selects']) {
        try {
            await this.db.initialize()
            // select all by default
            if(!selects){
                return this.db.getRepository(OfferEntity)
                    .createQueryBuilder('o')
                    .innerJoinAndSelect("o.coach", "coach")
                    .where('o.id = :id', {id})
                    .getOne()
            }
            // select defined
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('o')
                .innerJoin("o.coach", "coach")
                .select(selects.map(select => `o.${select}`))

                .where('offer.id = :id', {id})
                .getOne()
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    // create offers
    public async createByCoach(coachId: string, data: CreateOfferDto) {
        try {
            await this.db.initialize()
            const coach = await this.db.getRepository(CoachEntity).findOne({where: {id: coachId}})
            if (!coach) {
                throw new Error()
            }
            const offer = this.db.getRepository(OfferEntity).create(Object.assign(OfferEntity, {coach, ...data}))

            return this.db.getRepository(OfferEntity).save(offer)
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }
    // update offers
    public async update(coachId: string, offerId: string,) {
        try {
            await this.db.initialize()
            const offer = await this.db.getRepository(OfferEntity).findOne({ where: { id: offerId, coach: { id: coachId } }, relations: ['coach']});
            if (!offer) {
                throw new OfferNotFound();
            }

            return this.db.getRepository(OfferEntity).save(Object.assign(offer, {status:'DISABLED'}));
        } catch (e) {
            throw e
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }
}