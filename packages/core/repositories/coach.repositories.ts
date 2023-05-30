import {db} from "../database"
import {CoachTypes} from"../database/idatabase"




export const createCoach = async (coach:Omit<CoachTypes, 'id' | 'createAt'> ) => {
     const results = await db.insertInto('coachs').values([{
         email: coach.email,
         password: coach.password
     }]).execute()
    return results
}
export const getByMail = async (mail: string) => {
    return await db
        .selectFrom('coachs')
        .selectAll()
        .where('email', '=', mail)
        .executeTakeFirstOrThrow()
}
export const getById = async (id: string) => {
    const res = await db.selectFrom('coachs')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    return res
}

export const all = async () => {
    const res = await db
        .selectFrom('coachs')
        .selectAll()
        .execute()
    return res
}
