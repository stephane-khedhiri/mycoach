import {
    Kysely,
    PostgresDialect,
    Generated,
    ColumnType,
    Selectable,
    Insertable,
    Updateable,
} from 'kysely'
import {ICoachTable} from "./coach.table";

export interface IDatabase {
    coachs: ICoachTable
    personalInformationsCoach: {
        coachId: Generated<string>
        firstName: string
        lastName: string
        experience: number
        presentation: string
        avatar: string
    }
    users: {
        id: Generated<string>
        coachUuid: string
        mail: string
        password: string
        firstName: string
        lastName: string
    }
}