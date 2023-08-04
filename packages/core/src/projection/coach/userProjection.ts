import {Expose, Type} from 'class-transformer'
import {OfferProjection} from "../offer.projection";

export class UserProjection {
    @Expose()
    id: string
    @Expose()
    firstName: string
    @Expose()
    lastName: string
    @Expose()
    email: string
    @Expose()
    apiStripe: string | null
    password: string
    @Expose()
    @Type(() => OfferProjection)
    offers: OfferProjection[]
}