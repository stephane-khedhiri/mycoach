import {
    APIGatewayProxyHandlerV2WithLambdaAuthorizer
} from "aws-lambda";
import {UserRepository} from "@mycoach/core/src/repositories/";
import {DomainError, UserNotFound} from "@mycoach/core/error/errors";
import {plainToInstance} from "class-transformer";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {UserEntity} from "@mycoach/core/entities/user.entity";
import {DataProjection} from "@mycoach/core/projection";

const datasource = connection()
const userRepository = new UserRepository(datasource)

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user?: UserEntity, body?: string }> = async (event) => {
    try {
        const user = await userRepository.userById(event.pathParameters?.id ?? '', ['id', 'email'])
        if (!user) {
            throw new UserNotFound()
        }
        return responseToJson(
            plainToInstance(
                DataProjection,
                {data: [user]},
                {excludeExtraneousValues: true}
            ), 200)
    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}