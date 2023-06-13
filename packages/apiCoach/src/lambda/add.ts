import {IRegisterCoach, RegisterCoachDto} from "../dto/coach.dto";
import {validate, registerSchema, ValidationError} from "class-validator";
import {CoachRepository} from "../repositories/coach.repositories";
import {APIGatewayProxyEventV2} from "aws-lambda";
export const handler = async (event: APIGatewayProxyEventV2 ) => {

        const datas = event.body as string
    try {
        const coach = Object.assign(new RegisterCoachDto, JSON.parse(datas))

        return {
            statusCode:200,
            body: coach
        }
    }catch (e) {
        return {
            statusCode: 401,
            body: e
        }
    }

}