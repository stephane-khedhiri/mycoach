import {IsNumber, IsString} from "class-validator";

export class UpdateOfferDto {

    @IsString()
    readonly title?: string;

    @IsNumber()
    readonly price?: number;

    @IsString()
    readonly description?: string
}