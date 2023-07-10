import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {LoginCoachDto} from "@mycoach/core/dto/coach/login.coach.dto";
import {validateSync} from "class-validator";
import {DomainError, UserBadRequest, UserNotFound} from "@mycoach/core/error/errors";
import {CoachRepository} from "../../../../core/src/repositories/coach.repositories";
import {plainToClass} from "class-transformer";
import {UserProjection} from "@mycoach/core/projection/coach/userProjection";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt";
import {comparePassword} from "@mycoach/core/util/password";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try{
        const loginCoachDto = Object.assign(new LoginCoachDto(), JSON.parse(event.body?? ''))
        const errors = validateSync(loginCoachDto)
        if(errors.length > 0) {
            throw new UserBadRequest(errors)
        }
        const coach = await new CoachRepository().findByEmail(loginCoachDto.email)
        // verification du mdp
        if(!coach){
            throw new UserNotFound()
        }
        if(comparePassword(loginCoachDto.password, coach.password as string) ){
            throw new UserNotFound()
        }
        return {
            statusCode:200,
            body: JSON.stringify({
                ...plainToClass(UserProjection, coach),
                accessToken: generatedToken({id: coach.id, email:coach.email}, Config.PUBLIC_KEY)
            })
        }
    }catch (e: DomainError| any) {
        return {
            statusCode:e.code??500,
            body:  e.message,
        }
    }
}