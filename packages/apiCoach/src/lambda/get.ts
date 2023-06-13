import {getById} from '@mycoach/core/repositories/coach.repositories'
import {usePathParams} from "sst/node/api";
import {APIGatewayProxyHandlerV2} from "aws-lambda";
export const handler: APIGatewayProxyHandlerV2 = async (events, context, callback) => {

        // get params request
        const {id} = usePathParams()
        if(!id){
            throw new Error('param id not found');
        }
        const coach = await getById(id)

        return {
            statusCode:200,
            body: JSON.stringify(coach),
        }
}