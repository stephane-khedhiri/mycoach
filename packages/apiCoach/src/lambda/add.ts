import {IRegisterCoach, RegisterCoachDto} from "../dto/coach.dto";
import {validate, registerSchema, ValidationError} from "class-validator";
import {CoachRepository} from "../repositories/coach.repositories";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {UserError} from "@mycoach/core/util/errors";
export const handler = async (event: APIGatewayProxyEventV2 ) => {

        const datas = event.body as string
    try {
        const coach = Object.assign(new RegisterCoachDto, JSON.parse(datas))
        await validate(coach).then((result) => {
            const error = result[0]
            if(error !== undefined && error.constraints){
                throw new UserError(401, 'UserApiErrors', `${error.property}: ${error.value} is not valide`, coach)
            }
        })
        return {
            statusCode:200,
            body: coach
        }
    }catch (e : UserError|any) {
        return {
            statusCode: e.status,
            datas: e
        }
    }

}