import {ValidationError} from "class-validator";
import {constants} from 'http2'
import Stripe from "stripe"


export type ErrorCode = 'UserApiErrors'

export abstract class DomainError extends Error {
    protected constructor(public readonly type: string, readonly code: number, message: string) {
        super(message);
    }
    toPlain() {
        return {
            type: this.type,
            message: this.message,
            code: this.code,
            stack: process.env.IS_LOCAL ? this.stack : undefined
        }
    }
}

export abstract class ResourceNotFound extends DomainError {
    protected constructor(resource: string) {
        super(
            `${resource}NotFound`,
            constants.HTTP_STATUS_NOT_FOUND,
            `${resource} not found`);
    }
}


export class UserNotFound extends ResourceNotFound {
    constructor() {
        super('User');
    }


}

export class OfferNotFound extends ResourceNotFound{
    constructor() {
        super('Offer');
    }
}
export class SportsmanNotFound extends ResourceNotFound{
    constructor() {
        super('Sportsman');
    }
}


export abstract class BadRequest extends DomainError {
    protected constructor(message: string) {
        super(
            'BadRequest',
            constants.HTTP_STATUS_BAD_REQUEST,
            message);
    }
    formatErrors(errors: ValidationError[]) {
        const formattedErrors: Record<string, string[]> = {};

        errors.forEach((error: ValidationError) => {
            if (error.constraints) {
                formattedErrors[error.property] = Object.values(error.constraints || {});
            }
        });

        return formattedErrors;
    }
}
export class UserBadRequest extends BadRequest {
    constructor(readonly validationErrors: ValidationError[]) {
        super('UserInvalid');
    }

    toPlain(){
        return {
            ...super.toPlain(),
            errors: this.formatErrors(this.validationErrors)
        }
    }
}

export class OfferBadRequest extends BadRequest {
    constructor(readonly validationErrors: ValidationError[]) {
        super('OfferInvalid');
    }

    toPlain(){
        return {
            ...super.toPlain(),
            errors: this.formatErrors(this.validationErrors)
        }
    }
}
export class SportsmanBadRequest extends BadRequest {
    constructor(readonly validationErrors: ValidationError[]) {
        super('SportsmanInvalid');
    }

    toPlain(){
        return {
            ...super.toPlain(),
            errors: this.formatErrors(this.validationErrors)
        }
    }
}

export class PaymentError extends Stripe.errors.StripeAPIError {

    constructor(error: Stripe.StripeRawError) {
        super(error);
    }

    toPlain(){
        return {
            type: this.type,
            message: this.message,
            code: this.code,
            stack: process.env.IS_LOCAL ? this.stack : undefined
        }
    }
}

export class PaymentBadRequest extends BadRequest {
    constructor(readonly validationErrors: ValidationError[]) {
        super('paymentInvalid');
    }
    toPlain(){
        return {
            ...super.toPlain(),
            errors: this.formatErrors(this.validationErrors)
        }
    }
}

export class UnAuthorized extends BadRequest {
    constructor() {
        super('UnAuthorized');
    }
    toPlain() {
        return {
            ...super.toPlain()
        }
    }

}