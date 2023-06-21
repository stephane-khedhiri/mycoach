import {IsEmail, IsString, IsNotEmpty} from 'class-validator'
import {IsUserUnique} from "../../decorator/isUserUnique";


export interface ICreateCoachDto {
    readonly email: string
    readonly password: string
}

export class CreateCoachDto{
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string;
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique()
    readonly email: string;
}
