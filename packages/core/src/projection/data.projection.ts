import {Expose,Type} from 'class-transformer'
import {UserProjection} from "./coach/userProjection";
import {OfferProjection} from "./offer.projection";

export class DataProjection {
    @Expose()
    accessToken?: string
    @Expose()
    @Type(() => UserProjection )
    data: UserProjection[]
}