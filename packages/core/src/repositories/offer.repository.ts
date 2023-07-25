import {DataSource, SelectQueryBuilder} from "typeorm";
import {OfferEntity} from "../entities/offer.entity";
import {CoachEntity} from "../entities/coach.entity"
import {OfferNotFound} from "../error/errors";

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
                .createQueryBuilder('offer')
                .where('offer.coachId = :coachId', {coachId})
                .getMany()
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

    // get offers by id


    // create offers
    public async createByCoach(coachId: string, data: Partial<OfferEntity>) {
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
    public async update(coachId: string, offerId: string, updateOffer: Partial<OfferEntity>) {
        try {
            await this.db.initialize()
            const offer = await this.db.getRepository(OfferEntity).findOne({ where: { id: offerId, coach: { id: coachId } }, relations: ['coach']});
            if (!offer) {
                throw new OfferNotFound();
            }

            return this.db.getRepository(OfferEntity).save(Object.assign(offer, updateOffer));
        } catch (e) {
            throw e
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }
}