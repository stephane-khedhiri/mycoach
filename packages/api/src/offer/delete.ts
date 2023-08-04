import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {validateSync} from "class-validator";
import {DomainError, OfferBadRequest, OfferNotFound} from "@mycoach/core/error/errors";
import {UpdateOfferDto} from "@mycoach/core/dto/offer/update.offer.dto";
import {OfferRepository} from "@mycoach/core/src/repositories";
import {plainToInstance} from "class-transformer";
import type {UserEntityType} from "@mycoach/core/entities";
import {responseToJson} from "@mycoach/core/response";
import {OfferProjection} from "@mycoach/core/projection/offer.projection";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";

// connection a la basse de donnée
const offerRepository = new OfferRepository(new DataSource(databaseConfig))
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<{user:UserEntityType}> = async (event) => {

    try{
        if(!event.pathParameters?.id){
          throw new OfferNotFound()
        }
        const updateCoachDto = plainToInstance(UpdateOfferDto, JSON.parse(event.body??''))
        const errors = validateSync(updateCoachDto)
        if(errors.length > 0){
            throw new OfferBadRequest(errors)
        }

        const offer = await offerRepository.update(event.requestContext.authorizer.lambda.user.id, event.pathParameters?.id ,updateCoachDto)

        if(!offer){
            throw new OfferNotFound()
        }
        return responseToJson(
            plainToInstance(
                OfferProjection,
                {...offer},
                {excludeExtraneousValues: true}
            ),
            200)

    }catch (e: DomainError|any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }

}