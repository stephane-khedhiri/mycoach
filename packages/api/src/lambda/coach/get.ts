import {APIGatewayProxyEventV2} from "aws-lambda";
import {CoachRepository} from "../../repositories/coach.repositories";
import {UserNotFound} from "../../errors/errors";

export const handler = async (event: APIGatewayProxyEventV2) => {
    let statusCode, body
    try {
        body = await new CoachRepository().findById(event.pathParameters?.id as string)
        if (!body) {
            throw new UserNotFound()
        }
        statusCode = 200
    } catch (e: UserNotFound | any) {
        statusCode = e.statusCode
        body = JSON.stringify(e.toJSON())
    }
    return {
        statusCode,
        body
    }
}