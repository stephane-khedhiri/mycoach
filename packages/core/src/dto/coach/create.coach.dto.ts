import {IsEmail, IsString, IsNotEmpty} from 'class-validator'
import {IsUserUnique} from "../../decorator";
import {CoachEntity} from "../../entities/coach.entity";

export class CreateCoachDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique(CoachEntity)
    readonly email: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly firstName: string

    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()
    readonly lastName: string
}
