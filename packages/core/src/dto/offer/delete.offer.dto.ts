import {IsString} from "class-validator";

export class UpdateOfferDto {
    @IsString()
    id: string

}