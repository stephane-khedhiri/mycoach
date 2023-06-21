import {CreateCoachDto} from "../../dto/coach/create.coach.dto";
import {validate, validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import { plainToClass } from 'class-transformer';
import {DomainError, UserBadRequest} from "../../error/errors";
import {CoachRepository} from "../../repositories/coach.repositories";
import {UserProjection} from "../../projection/coach/userProjection";
import {generatedToken} from "../../util/jwt";
import {Config} from "sst/node/config";
import {encodePassword} from "../../util/password";




export const handler = async (event: APIGatewayProxyEventV2 ) => {
    try {

        const createCoachDto = Object.assign(new CreateCoachDto, JSON.parse(event.body?? ''))
        console.log(createCoachDto)
        const errors = await validate(createCoachDto)
        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }
        createCoachDto.password = encodePassword(createCoachDto.password)


        const coach = await new CoachRepository().create(createCoachDto)
        const accessToken = generatedToken({id: coach.id, email: coach.email}, Config.PRIVATE_KEY)
        return {
            statusCode: 200,
            body: JSON.stringify(plainToClass(UserProjection, {...coach, accessToken}))
        }

    }catch (e: DomainError | any) {
        return {
            statusCode: e.code?? 500,
            body: typeof e.toJson === 'function'? e.toJson(): e.message
        }
    }


}