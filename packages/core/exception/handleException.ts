export class HandleException extends Error {
    constructor(readonly message: string, readonly statusCode: number) {
        super(message);
    }
}

export class NotFound extends HandleException {
    constructor(readonly message: string, readonly statusCode= 404) {
        super(message, statusCode);
    }
}
export class BadRequest extends HandleException {
    constructor(readonly message:string, readonly statusCode= 400) {
        super(message, statusCode);
    }
}
export class Forbidden extends HandleException {
    constructor(readonly message:string, readonly statusCode = 403) {
        super(message, statusCode);
    }
}