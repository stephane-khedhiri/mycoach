import {
    APIGatewayRequestSimpleAuthorizerHandlerV2WithContext,
} from "aws-lambda";
import {Config} from "sst/node/config"
import {connection} from "@mycoach/core/connection";
import {UserRepository} from "@mycoach/core/repositories/user.repositories";
import {verifyTokenOrThrow} from "@mycoach/core/util/jwt";
import {UserPayloadWithJwt} from "@mycoach/core/types";
import {verify} from "jsonwebtoken"
import {responseToJson} from "@mycoach/core/response";
import {DomainError} from "@mycoach/core/error/errors";


const datasource = connection()
const userRepository = new UserRepository(datasource)

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2WithContext<UserPayloadWithJwt> = async (event) => {
    try {
        // get authorization
        const authHeader= event.headers?.authorization ?? ''
        const [schema, token] = authHeader.split(' ', 2)

        if(schema.toLowerCase() !== 'bearer'){
            throw new Error()
        }

        const userPayload =  await verifyTokenOrThrow(token, Config.PRIVATE_KEY)

        // check user in database
        console.log(userPayload.id)
        const user = await userRepository.userById(userPayload.id)
        return {
            isAuthorized: true,
            context: {
                user
            }
        }
    } catch (e: DomainError | any) {
        const statusCode = e.code ?? 500
        const body = typeof e.toJson === 'function' ? e.toJson() : e.message
        return responseToJson(body, statusCode)
    }

}
