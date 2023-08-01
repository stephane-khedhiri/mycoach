import {DataSource, Entity} from "typeorm";

import {CoachEntity} from "../entities/coach.entity";

export class UserRepository {
    constructor(private readonly db: DataSource) {}
    public async existByEmail(entity:Function,email: string) {
        try {
            await this.db.initialize()
            return await this.db.manager.createQueryBuilder()
                .from(entity, 'u')
                .where('u.email = :email', {email})
                .getCount()
        }catch (err) {}
        finally {
            if(this.db.isInitialized){
                await this.db.destroy()
            }
        }
    }
}