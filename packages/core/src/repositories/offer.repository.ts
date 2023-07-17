import {DataSource} from "typeorm";
import {OfferEntity} from "../entities/offer.entity";

export class OfferRepository {
    constructor(private readonly db: DataSource) {}
    public async offerByCoach(coachId: string){
        try{
            await this.db.initialize()
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('offer')
                .where('offer.coachId = :coachId', {coachId})
                .getMany()
        }catch (e) {
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async offerById(id: string){
        try{
            await this.db.initialize()
            return this.db.getRepository(OfferEntity)
                .createQueryBuilder('offer')
                .where('offer.id = :id', {id})
                .getMany()
        }catch (e) {
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}