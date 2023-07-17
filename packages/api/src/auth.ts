import {
    APIGatewayRequestSimpleAuthorizerHandlerV2WithContext,
} from "aws-lambda";
import {Config} from "sst/node/config"
import {connection} from "@mycoach/core/connection";
import {UserRepository} from "@mycoach/core/repositories/user.repositories";
import {verifyTokenOrThrow} from "@mycoach/core/util/jwt";
import {DomainError, UserNotFound} from "@mycoach/core/error/errors";
import type {UserEntityType} from "@mycoach/core/entities";



const datasource = connection()
const userRepository = new UserRepository(datasource)


export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<{user?:UserEntityType}> = async (event) => {
    try {
        // get authorization
        const authHeader= event.headers?.authorization ?? ''
        const [schema, token] = authHeader.split(' ', 2)

        if(schema.toLowerCase() !== 'bearer'){
            throw new Error()
        }

        const userPayload =  await verifyTokenOrThrow(token, Buffer.from(Config.PUBLIC_KEY, 'base64'))

        // check user in database
        const user = await userRepository.userById(userPayload.id, ['id', 'email'])
        if(!user){
            throw new UserNotFound()
        }
        return {
            isAuthorized: true,
            context: {
                user
            }
        }
    } catch (e: DomainError | any) {
        return {
            isAuthorized: false,
            context: {}
        }
    }

}
