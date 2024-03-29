import {Expose, Type} from 'class-transformer'
import {UserProjection} from "./coach/userProjection";
export class OfferProjection {
    @Expose()
    id: string

    @Expose()
    name: string

    @Expose()
    content: string
    @Expose()
    duration: number

    @Expose()
    price: number
}