import {IsNumber, IsString} from "class-validator";



export class CreatePersonalInformationDto{

    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName:string

    @IsString()
    readonly avatar: string;

    @IsNumber()
    readonly experience: number;

    @IsString()
    readonly presentation: string;
}