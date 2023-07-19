import type {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {CreateOfferDto} from "@mycoach/core/dto/offer/create.offer.dto";
import {validateSync} from "class-validator";
import {plainToInstance} from 'class-transformer';
import {DomainError, OfferBadRequest} from "@mycoach/core/error/errors";
import {OfferRepository} from "@mycoach/core/src/repositories/";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {DataProjection, UserProjection} from "@mycoach/core/projection";
import {UserEntityType} from "@mycoach/core/entities";

const datasource = connection()
const offerRepository = new OfferRepository(datasource)

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{ user: UserEntityType }> = async (event) => {
    try {

        const createOfferDto = plainToInstance(CreateOfferDto, JSON.parse(event.body ?? ''))
        const errors = validateSync(createOfferDto);

        if (errors.length > 0) {
            throw new OfferBadRequest(errors)
        }


        const offer = await offerRepository.createByCoach(event.requestContext.authorizer.lambda.user.id, createOfferDto)
        const userWithOffer = plainToInstance(
            UserProjection,
            {
                ...event.requestContext.authorizer.lambda.user,
                offer: [offer]
            }
        )
        return responseToJson(
            plainToInstance(
                DataProjection,
                {
                    data: [userWithOffer]
                },
                {excludeExtraneousValues: true}
            ),
            200)

    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }


}