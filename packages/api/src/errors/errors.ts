import {ValidationError} from "class-validator";
import {constants} from 'http2'

export type ErrorCode = 'UserApiErrors'

export abstract class DomainError extends Error {
    protected constructor(readonly code: number, message: string) {
        super(message);
    }
    abstract toJson(): string
}

export abstract class ResourceNotFound extends DomainError {
    protected constructor(resource: string) {
        super(constants.HTTP_STATUS_NOT_FOUND, `${resource} not found`);
    }
}

export class UserNotFound extends ResourceNotFound {
    constructor() {
        super('User');
    }
    toJson(): string {
        return JSON.stringify({
            type: this.constructor.name,
            message: this.message
        })
    }

}

export abstract class BadRequest extends DomainError {
    protected constructor(message: string) {
        super(constants.HTTP_STATUS_BAD_REQUEST, message);
    }
}
export class UserBadRequest extends BadRequest {
    constructor(readonly validationErrors: ValidationError[]) {
        super('UserInvalid');
    }

    toJson(): string{
        return JSON.stringify({
            type: this.constructor.name,
            message: this.message,
            errors: this.MessageFormatter()
        })
    }

    MessageFormatter(){
        const errors = []
        for(const validationError of this.validationErrors){
            if(validationError.constraints){
                for (const key in validationError.constraints){
                    if(validationError.constraints[key]){
                        errors.push({
                            field: validationError.property,
                            message: validationError.constraints[key]
                        })
                    }
                }
            }
        }
        return errors
    }
}