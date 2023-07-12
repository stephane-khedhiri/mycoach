import {Expose} from "class-transformer";
import {UserProjection} from "./coach/userProjection";

export class TokenProjection {
    @Expose({name: 'AccessToken'})
    accessToken: string
    data?: UserProjection[]
}