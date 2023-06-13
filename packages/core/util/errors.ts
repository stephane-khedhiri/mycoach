export type UserApiErrors = 'invalidUser' | 'UserNotFound'
export type ErrorCode = 'UserApiErrors'
export type ErrorStatus = 401 | 400
export class UserError extends Error {
    constructor(
        readonly status: ErrorStatus,
        readonly code: ErrorCode,
        readonly message: string,
        readonly data?: any
    ) {
        super(message);
    }
    toJSON() {
        return{
            error: {code: this.code, message: this.message}
        }
    }
}