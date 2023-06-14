import {APIGatewayProxyEventV2} from "aws-lambda";
import {UpdateableCoachRow} from "../database/coach.table";
import {validate} from "class-validator";
import {UserBadRequest} from "../errors/errors";
import {UpdateCoachDto} from "../dto/update.coach.dto";
import {CoachRepository} from "../repositories/coach.repositories";

export const handler = async (event: APIGatewayProxyEventV2) => {
    let statusCode, body
    try{
        const data = event.body as string
        const coach = Object.assign(new UpdateCoachDto, JSON.parse(data))
        await validate(coach).then((result) => {
            const error = result[0]
            if(error !== undefined && error.constraints){
                throw new UserBadRequest(error.property, error.value)
            }
        })
        body = await new CoachRepository().update(coach)
        console.log(body)
        statusCode = 200
    }catch (e: any) {
        statusCode= 500
        body = e.message
    }
    return {
        statusCode,
        body
    }
}