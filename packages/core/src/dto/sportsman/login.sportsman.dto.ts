import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginSportsmanDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    readonly email: string

}