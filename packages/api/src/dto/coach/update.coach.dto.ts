import {IsEmail, IsString} from "class-validator";

export class UpdateCoachDto {
    @IsString()
    readonly id: string
    @IsEmail()
    readonly email?: string;
    @IsString()
    readonly password?: string;
}