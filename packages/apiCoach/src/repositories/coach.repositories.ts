import {Database} from "../database"
import {CoachRow, InsertableCoachRow} from "../database/coach.table";


export class CoachRepository extends Database{
     create = async (coach: InsertableCoachRow): Promise<CoachRow> => {
        const insertCoach = await this.db
            .insertInto('coachs')
            .values(coach)
            .returningAll()
            .executeTakeFirstOrThrow()

         return insertCoach
    }
    findById = async (id: string) : Promise<CoachRow | undefined> => {
         const coach = await this.db
             .selectFrom('coachs')
             .where('id', '=', id)
             .selectAll()
             .executeTakeFirst()

        return coach
    }
    findByEmail = async (email: string) : Promise<CoachRow | undefined> => {
         const coach = await this.db
             .selectFrom('coachs')
             .where('email', '=', email)
             .selectAll()
             .executeTakeFirst()

        return coach
    }
}

