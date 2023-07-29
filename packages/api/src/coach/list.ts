import "reflect-metadata"
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {CoachRepository} from "@mycoach/core/repositories/";
import {responseToJson} from "@mycoach/core/response";
import type {UserEntityType} from "@mycoach/core/entities/";
import {DomainError} from "@mycoach/core/error/errors";
import {plainToInstance} from "class-transformer"
import {DataProjection} from "@mycoach/core/projection";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";

const coachRepository = new CoachRepository(new DataSource(databaseConfig))
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType }> = async (event) => {

    try {
        const users = await coachRepository.coachs()
        return responseToJson(
            plainToInstance(
                DataProjection,
                {data: users},
                {excludeExtraneousValues: true}
            ), 200)
    } catch (e: any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}