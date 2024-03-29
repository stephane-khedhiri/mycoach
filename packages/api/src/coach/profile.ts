import {
    APIGatewayProxyHandlerV2WithLambdaAuthorizer
} from "aws-lambda";
import {CoachRepository} from "@mycoach/core/src/repositories/";
import {DomainError, UserNotFound} from "@mycoach/core/error/errors";
import {plainToInstance} from "class-transformer";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {responseToJson} from "@mycoach/core/response";
import type {UserEntityType} from "@mycoach/core/entities";
import {DataProjection} from "@mycoach/core/projection";
import {DataSource} from "typeorm";

const coachRepository = new CoachRepository(new DataSource(databaseConfig))

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType}> = async (event) => {
    try {
        const user = await coachRepository.userById(event.requestContext.authorizer.lambda.user.id,["email", "lastName", "firstName", "id", "apiStripe"])
        if (!user) {
            throw new UserNotFound()
        }
        return responseToJson(
            plainToInstance(
                DataProjection,
                {data: user},
                {excludeExtraneousValues: true}
            ), 200)
    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}