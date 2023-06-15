import {IsEmail, IsString, IsDefined} from 'class-validator'
import {ValidationArguments} from "class-validator/types/validation/ValidationArguments";

export interface ICreateCoachDto {
    readonly email: string
    readonly password: string
}

export class CreateCoachDto{
    @IsDefined({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly password: string;
    @IsDefined({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    readonly email: string;
}
