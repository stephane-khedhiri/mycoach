import {createCoach} from "@mycoach/core/repositories/coach.repositories"
import { useJsonBody } from "sst/node/api";
import {CoachTypes} from "@mycoach/core/database/idatabase";
import {APIGatewayProxyHandlerV2} from "aws-lambda";
import * as debug from "@mycoach/core/debug";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    let body, statusCode
    debug.init(event)
    try {
        const {email, password} = useJsonBody()
        if(!email || !password){

        }
        const body = await createCoach({email,password})

    }catch (e: any) {
        debug.flush(e);

        body = { error: e.message };
        statusCode = 500;
    }
    return {
        statusCode,
        body: JSON.stringify(body)
    }



}