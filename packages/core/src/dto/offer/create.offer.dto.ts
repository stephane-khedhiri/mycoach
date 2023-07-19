import {IsString, IsNotEmpty, IsNumber} from 'class-validator'
export class CreateOfferDto {
    @IsString()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly title: string

    @IsNumber()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly price: number

    @IsString()
    @IsNotEmpty({message: ({property}) =>  `${property} is required` })
    readonly description: string
}