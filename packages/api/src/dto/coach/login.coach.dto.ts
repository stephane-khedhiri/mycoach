import {IsDefined, IsEmail, IsString} from "class-validator";

export class LoginCoachDto{
    @IsDefined({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly password: string;
    @IsDefined({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    readonly email: string;
}