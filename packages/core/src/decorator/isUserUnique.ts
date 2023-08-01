import 'reflect-metadata'
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";
import {DataSource} from "typeorm";
import {databaseConfig} from "../config/database.conf";
import {UserRepository} from "../repositories/user.repository";

const userRepository = new UserRepository(new DataSource(databaseConfig))

@ValidatorConstraint()
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments & {object: Object & {entity: Function}} ) {

        return userRepository.existByEmail(args.object.entity ,value).then((exist) => !exist)
    }
    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists`; // Message d'erreur personnalisé
    }
}
export function IsUserUnique(entity: Function, validationOptions?: ValidationOptions & {entity?: Function}) {
    return function (object: Object, propertyName: string) {
        object = {...object, entity}
        registerDecorator({
            name: 'isUserAlreadyExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UniqueOnDatabaseExistConstraint
        })
    }
}