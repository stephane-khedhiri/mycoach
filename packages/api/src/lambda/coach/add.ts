import {CreateCoachDto} from "../../dto/coach/create.coach.dto";
import {validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import { plainToClass } from 'class-transformer';
import {DomainError, UserBadRequest} from "../../errors/errors";
import {CoachRepository} from "../../repositories/coach.repositories";
import {UserProjection} from "../../projection/coach/userProjection";

export const handler = async (event: APIGatewayProxyEventV2 ) => {
    try {

        const createCoachDto = Object.assign(new CreateCoachDto, JSON.parse(event.body?? ''))
        const errors = validateSync(createCoachDto, { skipUndefinedProperties: true })
        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }

        const coach = await new CoachRepository().create(createCoachDto)
        return {
            statusCode: 200,
            body: JSON.stringify(plainToClass(UserProjection, coach))
        }

    }catch (e: DomainError | any) {
        return {
            statusCode: e.code,
            body: e.toJson()
        }
    }


}