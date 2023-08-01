import type {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {CreateOfferDto} from "@mycoach/core/dto/offer/create.offer.dto";
import {validateSync} from "class-validator";
import {plainToInstance} from 'class-transformer';
import {DomainError, OfferBadRequest} from "@mycoach/core/error/errors";
import {OfferRepository} from "@mycoach/core/src/repositories/";
import {responseToJson} from "@mycoach/core/response";
import {UserEntityType} from "@mycoach/core/entities";
import {OfferProjection} from "@mycoach/core/projection/offer.projection";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";

// connection a la basse de donnée
const offerRepository = new OfferRepository(new DataSource(databaseConfig))

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType }> = async (event) => {
    try {

        const createOfferDto = plainToInstance(CreateOfferDto, JSON.parse(event.body ?? ''))
        const errors = validateSync(createOfferDto);

        if (errors.length > 0) {
            throw new OfferBadRequest(errors)
        }


        const offer = await offerRepository.createByCoach(event.requestContext.authorizer.lambda.user.id, createOfferDto)
        return responseToJson(
            {data: [plainToInstance(
                    OfferProjection,
                    {...offer},
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