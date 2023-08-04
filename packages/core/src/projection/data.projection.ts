import {Expose,Type} from 'class-transformer'
import {UserProjection} from "./coach/userProjection";


export class DataProjection {
    @Expose()
    accessToken?: string
    @Expose()
    @Type(() => UserProjection )
    data: UserProjection[] | UserProjection
}