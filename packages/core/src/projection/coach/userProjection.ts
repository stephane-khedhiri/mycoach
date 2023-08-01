import {Expose, Type} from 'class-transformer'
import {OfferProjection} from "../offer.projection";

export class UserProjection {
    @Expose()
    id: string
    @Expose()
    email: string
    password: string
    @Expose()
    @Type(() => OfferProjection)
    offers: OfferProjection[]
}