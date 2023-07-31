import {DataSource} from "typeorm";
import {CommandeEntity} from "../entities/commande.entity";

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
}