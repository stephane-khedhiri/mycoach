import 'reflect-metadata'
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";
import {UserRepository} from "../repositories/";
import {connection} from "../connection";

const datasource = connection()
const userRepository = new UserRepository(datasource)
@ValidatorConstraint()
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return userRepository.existByEmail(value).then((exist) => !exist)
    }
    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists`; // Message d'erreur personnalisé
    }
}
export function IsUserUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isUserAlreadyExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UniqueOnDatabaseExistConstraint
        })
    }
}