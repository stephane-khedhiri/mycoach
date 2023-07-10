import {
    APIGatewayProxyHandlerV2WithLambdaAuthorizer
} from "aws-lambda";
import {CoachRepository} from "../../../../core/src/repositories/coach.repositories";
import {DomainError, UserNotFound} from "@mycoach/core/error/errors";
import {plainToClass} from "class-transformer";
import {UserProjection} from "@mycoach/core/projection/coach/userProjection";
import {UserPayloadWithJwt} from "@mycoach/core/types";

export const handler:APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {
    try {


        const coach = await new CoachRepository().findById(event.pathParameters?.id ?? '', true)
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