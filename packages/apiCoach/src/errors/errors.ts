export type UserApiErrors = 'invalidUser' | 'UserNotFound'
export type ErrorCode = 'UserApiErrors'
export type ErrorStatus = 401 | 400

export class NotFound extends Error {
    readonly statusCode = 404
    constructor(message:string) {
        super(message);
    }
}

export class UserNotFound extends NotFound {
    constructor() {
        super('user not found');
        this.name = 'UserNotFound'
    }
    toJSON(){
        return {
            type: this.name,
            message: this.message
        }
    }
}

export class BadRequest extends Error {
    readonly statusCode = 400
    constructor(message: string) {
        super(message);
    }
}
export class UserBadRequest extends BadRequest {
    constructor(ressource: string, value?: string) {
        if(value === undefined){
            super(`${ressource} is required`);
        }else{

            super(`${ressource}: ${value} is not valide`);
        }
        this.name = 'invalidUser'
    }

    toJSON(){
        return {
            type: this.name,
            message: this.message
        }
    }
}