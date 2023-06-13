import {getById} from '@mycoach/core/repositories/coach.repositories'
import {usePathParams} from "sst/node/api";

export const handler = async () => {

        // get params request
        const {id} = usePathParams()
        if(!id){
            throw new Error('param id not found');
        }
        const coach = await getById(id)
        return {
            statusCode:200,
            body: coach,
        }
}