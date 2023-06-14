import {IsEmail, IsString} from 'class-validator'

export interface ICreateCoachDto {
    readonly email: string
    readonly password: string
}

export class CreateCoachDto{
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly password: string;
}
