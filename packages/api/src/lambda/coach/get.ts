import {
    APIGatewayProxyHandlerV2WithLambdaAuthorizer
} from "aws-lambda";
import {CoachRepository} from "../../repositories/coach.repositories";
import {DomainError, UserNotFound} from "../../error/errors";
import {plainToClass} from "class-transformer";
import {UserProjection} from "../../projection/coach/userProjection";
import {UserPayloadWithJwt} from "../../types";

export const handler:APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {
    try {


        const coach = await new CoachRepository().findById(event.pathParameters?.id ?? '')
        if (!coach) {
            throw new UserNotFound()
        }
        return {
            statusCode:200,
            body: JSON.stringify(plainToClass(UserProjection, coach))
        }
    } catch (e: DomainError | any) {
        return {
            statusCode:e.code,
            body: e.toJson()
        }
    }

}