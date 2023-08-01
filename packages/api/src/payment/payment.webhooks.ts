import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {
    DomainError, OfferNotFound,
    PaymentError,
} from "@mycoach/core/error/errors";
import {responseToJson} from "@mycoach/core/response";
import {Config} from 'sst/node/config'
import Stripe from 'stripe'
import {CommandeRepository, OfferRepository, SportsmanRepository} from "@mycoach/core/repositories";
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {DataSource} from "typeorm";

const commandeRepository = new CommandeRepository(new DataSource(databaseConfig))
const offerRepository = new OfferRepository(new DataSource(databaseConfig))
const sportsmanRepository = new SportsmanRepository(new DataSource(databaseConfig))

const stripe = new Stripe(Config.STRIPE_CLIENT_ID_SECRET, {apiVersion: '2022-11-15'})
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    let header
    try {
        const requestBody = JSON.parse(event.body ?? '')
        header = event?.headers['stripe-signature'] ?? ''
        if (!requestBody.data.object.livemode) {
            header = stripe.webhooks.generateTestHeaderString({
                payload: event.body ?? '',
                secret: Config.STRIPE_WEBHOOKS_SECRET,
            });
        }

        const webhook = stripe.webhooks.constructEvent(event.body ?? '', header, Config.STRIPE_WEBHOOKS_SECRET)

        switch (webhook.type) {
            case 'checkout.session.completed':
                const offer = await offerRepository.offerByIdWithCoach(requestBody.data.object.metadata.offerId ?? '')
                const sportsman = await  sportsmanRepository.sportsmanByEmail(requestBody.data.object.metadata.email ?? '')
                if(!offer || !sportsman){
                    break;
                }
                await commandeRepository.create({offer, coach: offer.coach, sportsman, paymentId: webhook.id})
                break;
            default:
                console.log(`Unhandled event type ${webhook.type}`);
        }
        return responseToJson({data: 'pay'}, 200)
    } catch
        (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }
}
