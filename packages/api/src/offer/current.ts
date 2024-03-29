import type {APIGatewayProxyHandlerV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, OfferNotFound} from "@mycoach/core/error/errors";
import {OfferRepository} from "@mycoach/core/src/repositories/";
import {responseToJson} from "@mycoach/core/response";
import {OfferProjection} from "@mycoach/core/projection/offer.projection";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {UserEntityType} from "@mycoach/core/entities";


// connection a la basse de donnée
const offerRepository = new OfferRepository(new DataSource(databaseConfig))

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType }> = async (event) => {
    try {
        const offer = await offerRepository.offersByCoach(event.requestContext.authorizer.lambda.user.id)
        if(!offer){
            throw new OfferNotFound()
        }
        return responseToJson(
            {data: plainToInstance(
                    OfferProjection,
                    offer,
                    {excludeExtraneousValues: true}
                )},
            200)

    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }
}