import {DataSource} from "typeorm";
import {CommandeEntity} from "../entities/commande.entity";
import {SportsmenEntity} from "../entities/sportsmen.entity";
import {CoachEntity} from "../entities/coach.entity";
import {OfferEntity} from "../entities/offer.entity";

export class CommandeRepository {
    constructor(private readonly db: DataSource) {}

    public async findByCoachWithId (id: string){
        try{

            await this.db.initialize()
            return this.db.getRepository(CommandeEntity)
                .createQueryBuilder('c')
                .innerJoin("c.sportsman", "sportsmen")
                .where('c.coachId = :id', {id})
                .getMany()
        }catch (err) {
            throw err
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async create (commande: { paymentId: string, sportsman: SportsmenEntity, offer: OfferEntity, coach:CoachEntity }) {
        try{
            console.log(commande)
            await this.db.initialize()
            const commandeEntity = this.db.getRepository(CommandeEntity).create(Object.assign(CommandeEntity, commande))
            return this.db.getRepository(CommandeEntity).save(commandeEntity)
        }catch (e) {
            throw e
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
    public async delete(id: string) {
        try{
            await this.db.initialize()
            return this.db.getRepository(CommandeEntity).createQueryBuilder('c')
                .delete()
                .where("c.id = :id", {id})
                .execute()
        }catch (e) {
            throw e
        }finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}