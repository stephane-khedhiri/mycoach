
import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {LoginCoachDto} from "../../dto/coach/login.coach.dto";
import {validateSync} from "class-validator";
import {DomainError, UserBadRequest} from "../../error/errors";
import {CoachRepository} from "../../repositories/coach.repositories";
import {plainToClass} from "class-transformer";
import {UserProjection} from "../../projection/coach/userProjection";
import {Config} from "sst/node/config";
import {generatedToken} from "../../util/jwt";

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
            throw new Error('email')
        }
        if(coach.password !== loginCoachDto.password){
            throw new Error('password')
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
            statusCode:500,
            body:e.toJson(),
        }
    }
}