import {IsString} from "class-validator";

export class DeleteOfferDto {
    @IsString()
    id: string

}