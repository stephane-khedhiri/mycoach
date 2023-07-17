import {Expose} from 'class-transformer'
export class OfferProjection {
    @Expose()
    id?: string

    @Expose()
    name?: string

    @Expose()
    description?: string

}