import {Database} from "../database"
import {CoachRow, InsertableCoachRow, UpdateableCoachRow} from "../database/coach.table";
import {sql} from "kysely";


export class CoachRepository extends Database {
    create = (coach: InsertableCoachRow): Promise<CoachRow> => {
        const insertCoach = this.db
            .insertInto('coachs')
            .values(coach)
            .returningAll()
            .executeTakeFirstOrThrow()

        return insertCoach
    }
    update =  (coach: UpdateableCoachRow): Promise< CoachRow |undefined> => {
        const {id} = coach
        Reflect.deleteProperty(coach, 'id')
        const update = this.db
            .updateTable('coachs')
            .set({...coach})
            .where('id', '=', sql`uuid(id)`)
            .returningAll()
            .executeTakeFirst()
        return update
    }
    findById = (id: string): Promise<CoachRow | undefined> => {
        const coach= this.db
            .selectFrom('coachs')
            .where('id', '=', sql`uuid(id)`)
            .selectAll('coachs')
            .executeTakeFirst()

        return coach
    }
    findByEmail =  (email: string): Promise<CoachRow | undefined> => {
        const coach= this.db
            .selectFrom('coachs')
            .where('email', '=', email)
            .selectAll()
            .executeTakeFirst()

        return coach
    }
    // add join
    all = (): Promise<CoachRow[] | undefined> => {
        const coachs =  this.db
            .selectFrom('coachs')
            .selectAll()
            .execute()
        return coachs
    }
}

