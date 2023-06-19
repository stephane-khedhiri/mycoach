import {Database} from "../database"
import {CoachRow, InsertableCoachRow, UpdateableCoachRow} from "../database/coach.table";
import {sql} from "kysely";
import {UpdateResult} from "kysely";
import {UpdateCoachDto} from "../dto/coach/update.coach.dto";


export class CoachRepository extends Database {
    create = async (coach: InsertableCoachRow): Promise<CoachRow> => {
        const insertCoach = await this.db
            .insertInto('coachs')
            .values(coach)
            .returningAll()
            .executeTakeFirstOrThrow()

        return insertCoach
    }
    update = async (coach: UpdateCoachDto): Promise< CoachRow |undefined> => {
        const {id} = coach
        Reflect.deleteProperty(coach, 'id')
        const update = await this.db
            .updateTable('coachs')
            .set({...coach})
            .where('id', '=', sql`uuid(id)`)
            .returningAll()
            .executeTakeFirst()
        return update
    }
    findById = async (id: string): Promise<CoachRow | undefined> => {
        const coach = await this.db
            .selectFrom('coachs')
            .where('id', '=', sql`uuid(id)`)
            .selectAll('coachs')
            .executeTakeFirst()

        return coach
    }
    findByEmail = async (email: string): Promise<CoachRow | undefined> => {
        const coach = await this.db
            .selectFrom('coachs')
            .where('email', '=', email)
            .selectAll()
            .executeTakeFirst()

        return coach
    }
    // add join
    all = async (): Promise<CoachRow[] | undefined> => {
        const coachs = await this.db
            .selectFrom('coachs')
            .selectAll()
            .execute()
        return coachs
    }
}

