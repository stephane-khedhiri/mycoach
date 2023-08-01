import {IsEmail, IsString, IsUrl, IsUUID} from "class-validator";


export class CreatePaymentDto {
    @IsString()
    @IsUrl()
    success_url: string
    @IsString()
    @IsUrl()
    cancel_url: string
    @IsString()
    @IsUUID("all")
    offerId: string
    @IsEmail()
    sportsman: string

}