import {IsEmail, IsString, IsDefined} from 'class-validator'


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
