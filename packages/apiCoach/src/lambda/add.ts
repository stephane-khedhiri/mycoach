import {CreateCoachDto} from "../dto/create.coach.dto";
import {validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";

import {DomainError, UserBadRequest} from "../errors/errors";
import {CoachRepository} from "../repositories/coach.repositories";

export const handler = async (event: APIGatewayProxyEventV2 ) => {
    try {

        const createCoachDto = Object.assign(new CreateCoachDto, JSON.parse(event.body?? ''))
        const errors = validateSync(createCoachDto, { skipUndefinedProperties: true })
        if(errors.length > 0){
            throw new UserBadRequest(errors)
        }
        return {
            statusCode: 200,
            body: JSON.stringify('test')
        }

    }catch (e: DomainError | any) {
        return {
            statusCode: e.code,
            body: e.toJson()
        }
    }


}