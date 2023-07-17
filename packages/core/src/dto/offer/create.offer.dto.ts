import {IsString, IsNotEmpty, IsNumber} from 'class-validator'
export class CreateOfferDto {
    @IsString()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly name: string

    @IsNumber()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly price: number

    @IsString()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly description: string
}