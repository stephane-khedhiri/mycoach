import {Expose, Type} from 'class-transformer'
import {OfferProjection} from "../offer.projection";

export class UserProjection {
    id: string
    @Expose()
    email: string
    password: string
    @Expose()
    @Type(() => OfferProjection)
    offers: OfferProjection[]
}