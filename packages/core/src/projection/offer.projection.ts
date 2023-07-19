import {Expose, Type} from 'class-transformer'
import {UserProjection} from "./coach/userProjection";
export class OfferProjection {
    @Expose()
    id: string

    @Expose()
    title: string

    @Expose()
    description: string

    @Expose()
    price: number
}