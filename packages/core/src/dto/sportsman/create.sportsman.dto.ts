import {IsEmail, IsNotEmpty} from 'class-validator'
import {IsUserUnique} from "../../decorator";
import {SportsmenEntity} from "../../entities/sportsmen.entity";


export class CreateSportsmanDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique(SportsmenEntity)
    readonly email: string

}