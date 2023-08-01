import {IsEmail, IsString} from "class-validator";

export class UpdateCoachDto {

    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly password?: string;

    @IsString()
    readonly firstName?: string

    @IsString()
    readonly lastName?: string
}