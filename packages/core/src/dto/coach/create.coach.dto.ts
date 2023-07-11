import {IsEmail, IsString, IsNotEmpty, IsNumber, ValidateNested, validate} from 'class-validator'
import {IsUserUnique} from "../../decorator";






export class CreateCoachDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string;
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique()
    readonly email: string;
}
