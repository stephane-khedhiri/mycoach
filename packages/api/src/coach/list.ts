import "reflect-metadata"
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {UserRepository} from "@mycoach/core/repositories/user.repositories";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {UserEntity} from "@mycoach/core/entities/user.entity";
import {DomainError} from "@mycoach/core/error/errors";
import {plainToInstance} from "class-transformer"
import {DataProjection} from "@mycoach/core/projection";

const datasource = connection()
const userRepository = new UserRepository(datasource)
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user?: UserEntity, body?: string }> = async (event) => {

    try {
        const users = await userRepository.users()
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