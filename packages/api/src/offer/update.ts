import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {validateSync} from "class-validator";
import {DomainError, OfferBadRequest, OfferNotFound, UnAuthorized, UserBadRequest} from "@mycoach/core/error/errors";
import {UpdateOfferDto} from "@mycoach/core/dto/offer/update.offer.dto";
import {OfferRepository} from "@mycoach/core/src/repositories";
import {plainToInstance} from "class-transformer";
import {DataProjection} from "@mycoach/core/projection";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt"
import type {UserEntityType} from "@mycoach/core/entities";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {OfferProjection} from "@mycoach/core/projection/offer.projection";

const datasource = connection()
const offerRepository = new OfferRepository(datasource)
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
        console.log(offer)
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