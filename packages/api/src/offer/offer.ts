import type {APIGatewayProxyHandlerV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, OfferNotFound} from "@mycoach/core/error/errors";
import {OfferRepository} from "@mycoach/core/src/repositories/";
import {responseToJson} from "@mycoach/core/response";
import {OfferProjection} from "@mycoach/core/projection/offer.projection";
import {DataSource} from "typeorm";
import {databaseConfig} from "@mycoach/core/config/database.conf";

// connection a la basse de donnée
const offerRepository = new OfferRepository(new DataSource(databaseConfig))

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const offer = await offerRepository.offerById(event.pathParameters?.id ?? '')
        if(!offer){
            throw new OfferNotFound()
        }
        console.log(offer)
        return responseToJson(
            {data: [plainToInstance(
                    OfferProjection,
                    offer,
                    {excludeExtraneousValues: true}
                )]},
            200)

    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }
}