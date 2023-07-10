import {
    APIGatewayRequestSimpleAuthorizerHandlerV2WithContext,
} from "aws-lambda";
import {CoachRepository} from "../../../../core/src/repositories/coach.repositories";
import {verifyTokenOrThrow} from "@mycoach/core/util/jwt";
import {Config} from "sst/node/config"
import {UserPayloadWithJwt} from "@mycoach/core/types";




export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<UserPayloadWithJwt> = async (event) => {
    try {
        // get authorization
        const authHeader= event.headers?.authorization ?? ''
        const [schema, token] = authHeader.split(' ', 2)
        if(schema.toLowerCase() !== 'bearer'){
            throw new Error()
        }
        const userPayload = verifyTokenOrThrow(token, Config.PUBLIC_KEY)

        // check user in database
        //const user = await new CoachRepository().findById(userPayload.id, false)
        //console.log(user)
        // if(!user){
        //     throw new Error()
        // }
        return {
            isAuthorized: true,
            context: {
                userPayload
            }
        }
    } catch (e) {
        return {
            isAuthorized: false,
            context: {}
        }
    }

}
