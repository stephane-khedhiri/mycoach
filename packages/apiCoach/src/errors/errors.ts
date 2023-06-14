export type UserApiErrors = 'invalidUser' | 'UserNotFound'
export type ErrorCode = 'UserApiErrors'
export type ErrorStatus = 401 | 400

class NotFound extends Error {
    readonly statusCode = 404
    constructor() {
        super();
    }
}

class BadRequest extends Error {
    readonly statusCode = 400
    constructor(message: string) {
        super(message);
    }
}
class UserBadRequest extends BadRequest {
    constructor(ressource: string) {
        super(`${ressource} is not valide`);
    }
}