import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,
} from "class-validator";
import {CoachRepository} from "../repositories/coach.repositories";


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

@ValidatorConstraint({async: false})
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const user = await new CoachRepository().findByEmail(value)
        return !user?.email
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists`; // Message d'erreur personnalisé
    }
}