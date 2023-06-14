import {RegisterCoachDto} from "../dto/coach.dto";
import {validate} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {UserBadRequest} from "../errors/errors";
import {CoachRepository} from "../repositories/coach.repositories";
import * as console from "console";

export const handler = async (event: APIGatewayProxyEventV2 ) => {
    let statusCode, body
    try{
        const datas = event.body as string

        const coach = Object.assign(new RegisterCoachDto, JSON.parse(datas))
        await validate(coach).then((result) => {
            const error = result[0]
            if(error !== undefined && error.constraints){
                throw new UserBadRequest(error.property, error.value)
            }
        })
        statusCode = 200
        body = await new CoachRepository().create(coach)

    }catch (e : UserBadRequest|any) {
        statusCode = e.statusCode
        body = e.toJSON()
    }
    return {
        statusCode,
        body
    }

}