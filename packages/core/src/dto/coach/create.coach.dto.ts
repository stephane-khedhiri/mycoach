import {IsEmail, IsString, IsNotEmpty} from 'class-validator'
import {IsUserUnique} from "../../decorator";






export class CreateCoachDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique()
    readonly email: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly firstName: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly lastName: string
}
