import {
    Kysely,
    PostgresDialect,
    Generated,
    ColumnType,
    Selectable,
    Insertable,
    Updateable,
} from 'kysely'
export type CoachTypes =  {
    id: Generated<string>
    email: string;
    password: string;
    createAt:Generated<Date>

}
export interface IDatabase {
    coachs: CoachTypes
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