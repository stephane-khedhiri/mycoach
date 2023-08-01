import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {
    DomainError,
    OfferNotFound, PaymentBadRequest,
    PaymentError,
} from "@mycoach/core/error/errors";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {responseToJson} from "@mycoach/core/response";
import {DataSource} from "typeorm";
import {Config} from 'sst/node/config'
import {OfferRepository} from "@mycoach/core/repositories";
import Stripe from 'stripe'
import {convertToUnitAmount} from "@mycoach/core/util/convert";
import {plainToInstance} from "class-transformer";
import {CreatePaymentDto} from "@mycoach/core/dto/create.payment.dto";
import {validateSync} from "class-validator";

const offerRepository = new OfferRepository(new DataSource(databaseConfig))

const stripe = new Stripe(Config.STRIPE_CLIENT_ID_SECRET, {apiVersion: '2022-11-15'})
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const createPaymentDto = plainToInstance(CreatePaymentDto, JSON.parse(event.body ?? ''))
        const errors = validateSync(createPaymentDto)
        if(errors.length > 0){
            throw new PaymentBadRequest(errors)
        }
        const offer = await offerRepository.offerByIdWithCoach(createPaymentDto.offerId)

        if (!offer) {
            throw new OfferNotFound()
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ['card'],
            currency: offer.currency,
            metadata: {
                "offerId": `${offer.id}`,
                "email": createPaymentDto.sportsman
            },
            success_url: createPaymentDto.success_url,
            cancel_url: createPaymentDto.cancel_url,
            line_items: [{
                price_data: {
                    currency: offer.currency,
                    product_data: {
                        name: offer.name,
                    },
                    unit_amount: convertToUnitAmount(offer.price, offer.currency)
                },
                quantity: 1
            }],
        })
            .catch(e => {
                throw new PaymentError(e)
            })

        return responseToJson({data: {url: session.url}}, 200)
    } catch (e: DomainError | PaymentError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        if (e instanceof PaymentError) {
            return responseToJson({
                type: e.type,
                message: e.message,
                code: e.code,
                stack: process.env.IS_LOCAL ? e.stack : undefined
            }, e.statusCode ?? 500)
        }

        return responseToJson(e.message, 500)
    }
}