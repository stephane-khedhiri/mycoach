import {DataSource, SelectQueryBuilder} from "typeorm";
import {OfferEntity} from "../entities/offer.entity";
import {CoachEntity} from "../entities/coach.entity"
import {OfferNotFound, UnAuthorized} from "../error/errors";

export class OfferRepository {
    constructor(private readonly db: DataSource) {
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

    public async offerById(id: string) {
        try {
            await this.db.initialize()
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('offer')
                .where('offer.id = :id', {id})
                .getMany()
        } catch (e) {
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

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

    public async offerByCoachAndById(coachId: string, offerId: string, selects?: SelectQueryBuilder<OfferEntity>['selects']) {
        try {

            await this.db.initialize()
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder()
                .select()
                .where('id = :offerId', {offerId})
                .andWhere('coachId = :coachId', {coachId})
                .getRawOne()

        } catch (e) {
            throw  e
        } finally {
            if (this.db.isInitialized) {
                await this.db.destroy()
            }
        }
    }

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