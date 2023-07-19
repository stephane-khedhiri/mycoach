import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {validateSync} from "class-validator";
import {DomainError, UnAuthorized, UserBadRequest} from "@mycoach/core/error/errors";
import {UpdateCoachDto} from "@mycoach/core/dto/coach/update.coach.dto";
import {CoachRepository} from "@mycoach/core/src/repositories";
import {plainToInstance} from "class-transformer";
import {DataProjection} from "@mycoach/core/projection";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt"
import type {UserEntityType} from "@mycoach/core/entities";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";

const datasource = connection()
const coachRepository = new CoachRepository(datasource)
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{user:UserEntityType}> = async (event) => {

    try{
        if(!event.requestContext.authorizer.lambda.user){
            throw new UnAuthorized()
        }

        const updateCoachDto = plainToInstance(UpdateCoachDto, JSON.parse(event.body??''),)
        const errors = validateSync(updateCoachDto)

        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }

        const updateUser = await coachRepository.update(event.requestContext.authorizer.lambda.user.id, updateCoachDto)
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