import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {validateSync} from "class-validator";
import {DomainError, UnAuthorized, UserBadRequest} from "@mycoach/core/error/errors";
import {UpdateCoachDto} from "@mycoach/core/dto/coach/update.coach.dto";
import {UserRepository} from "@mycoach/core/src/repositories";
import {plainToClass, plainToInstance} from "class-transformer";
import {DataProjection, TokenProjection} from "@mycoach/core/projection";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt"
import {UserEntity} from "@mycoach/core/entities/user.entity";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";

const datasource = connection()
const userRepository = new UserRepository(datasource)
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{user?:UserEntity, body?: string}> = async (event) => {

    try{
        if(!event.requestContext.authorizer.lambda.user){
            throw new UnAuthorized()
        }

        const updateCoachDto = Object.assign(
            UpdateCoachDto,
            {
                ...JSON.parse(event.body??''),
                id: event.requestContext.authorizer.lambda.user.id}
        )
        const errors = validateSync(updateCoachDto)

        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }

        const updateUser = await userRepository.update(updateCoachDto)
        if(!updateUser){
            throw Error('test')
        }
        return responseToJson(
            plainToInstance(
                DataProjection,
                {
                    AccessToken: generatedToken(updateUser, Buffer.from(Config.PRIVATE_KEY, 'base64')),
                    data: [updateUser]
                }
            ),
            200)

    }catch (e: DomainError|any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}