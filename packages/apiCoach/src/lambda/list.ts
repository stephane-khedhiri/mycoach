import {APIGatewayProxyEventV2} from "aws-lambda";
import {CoachRepository} from "../repositories/coach.repositories";

export const handler = async (event: APIGatewayProxyEventV2) => {
    let statusCode, body
    try {
        body = await new CoachRepository().all()
    }catch (e: any) {
        statusCode = 500
        body= e.message
    }
    return {
        statusCode,
        body
    }
}