import {IsEmail, IsString} from 'class-validator'

export interface IRegisterCoach {
    readonly email: string
    readonly password: string
}

export class RegisterCoachDto{
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly password: string;
}
