import 'reflect-metadata'
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {responseToJson} from "@mycoach/core/response";
import type {UserEntityType} from "@mycoach/core/entities/";
import {DomainError} from "@mycoach/core/error/errors";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";
import {CommandeRepository} from "@mycoach/core/repositories/commande.repository";


const commandeRepository = new CommandeRepository(new DataSource(databaseConfig))
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType }> = async (event) => {

    try {
        const commandes = await commandeRepository.findByCoachWithId(event.requestContext.authorizer.lambda.user.id)
        return responseToJson( {data: commandes}, 200)
    } catch (e: any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}