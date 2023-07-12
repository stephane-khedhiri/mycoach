import {IsEmail, IsString, IsNotEmpty, ValidateNested} from 'class-validator'
import {IsUserUnique} from "../../decorator";






export class CreateUserDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string;

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique()
    readonly email: string;
}
