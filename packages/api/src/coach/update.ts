import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {validateSync} from "class-validator";
import {DomainError, UserBadRequest} from "@mycoach/core/error/errors";
import {UpdateCoachDto} from "@mycoach/core/dto/coach/update.coach.dto";
import {CoachRepository} from "../../../../core/src/repositories/coach.repositories";
import {plainToClass} from "class-transformer";
import {UserProjection} from "@mycoach/core/projection/coach/userProjection";
import {UserPayloadWithJwt} from "@mycoach/core/types";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt"
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {

    try{
        const updateCoachDto = Object.assign(
            new UpdateCoachDto,
            {
                ...JSON.parse(event.body??''),
                id: event.requestContext.authorizer.lambda.id}
        )
        const errors = validateSync(updateCoachDto)

        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }

        const updateCoach = await new CoachRepository().update(updateCoachDto)
        if(!updateCoach){
            throw Error('test')
        }
        const accessToken = generatedToken(event.requestContext.authorizer.lambda, Config.PRIVATE_KEY)
        return{
            statusCode:200,
            headers: {
                'Content-Types': 'application/json'
            },
            body: JSON.stringify({
                ...plainToClass(UserProjection, updateCoach),
                accessToken
            })
        }
    }catch (e: DomainError|any) {
        return {
            statusCode: e.code,
            body: e.toJson()
        }
    }

}