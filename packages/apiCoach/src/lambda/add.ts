import {RegisterCoachDto} from "../dto/coach.dto";
import {validate} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
<<<<<<< HEAD
import {UserBadRequest} from "../errors/errors";
import {CoachRepository} from "../repositories/coach.repositories";
import * as console from "console";

=======
import {UserError} from "@mycoach/core/util/errors";
>>>>>>> 91ee98bb1c326db4233ec8b17ce12b31371a2aa4
export const handler = async (event: APIGatewayProxyEventV2 ) => {
    let statusCode, body
    try{
        const datas = event.body as string
<<<<<<< HEAD

=======
    try {
>>>>>>> 91ee98bb1c326db4233ec8b17ce12b31371a2aa4
        const coach = Object.assign(new RegisterCoachDto, JSON.parse(datas))
        await validate(coach).then((result) => {
            const error = result[0]
            if(error !== undefined && error.constraints){
<<<<<<< HEAD
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
=======
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
>>>>>>> 91ee98bb1c326db4233ec8b17ce12b31371a2aa4
    }

}