import {Generated, Insertable, Selectable, Updateable} from "kysely"

export interface ICoachTable {
    id: Generated<string>
    email: string | null
    password: string | null
    createdAt: Generated<Date>
}

export type CoachRow = Selectable<ICoachTable>
export type InsertableCoachRow = Insertable<ICoachTable>
export type UpdateableCoachRow = Updateable<ICoachTable>