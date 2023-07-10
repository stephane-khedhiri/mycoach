import {IsEmail, IsString, IsNotEmpty, IsNumber, ValidateNested, validate} from 'class-validator'
import {IsUserUnique} from "@mycoach/functions/src/decorator/isUserUnique";
import {CreatePersonalInformationDto} from "./create.personalInformation.dto";
import {InsertableCoachRow} from "../../database/coach.table";
import {PersonalInformationsCoachRow} from "../../database/personalInformationsCoach.table";
import {Type} from "class-transformer";
import 'reflect-metadata'
import {UserBadRequest} from "@mycoach/functions/src/error/errors";


export interface ICreateCoachDto {
    readonly email: string
    readonly password: string
}

export class CreateCoachDto {
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsString()

    readonly password: string;
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    @IsEmail()
    @IsUserUnique()
    readonly email: string;

    @ValidateNested()
    @IsNotEmpty({message: "Personal information is required"})
    @Type(() => CreatePersonalInformationDto)
    readonly personalInformation: CreatePersonalInformationDto



}
