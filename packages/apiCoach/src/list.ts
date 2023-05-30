import {all} from '@mycoach/core/repositories/coach.repositories'


export const list = async () => {
    const coachs = await all()
    return {
        statusCode:200,
        body: coachs,
    }
}