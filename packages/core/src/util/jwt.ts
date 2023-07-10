import {JwtPayload, sign, verify} from "jsonwebtoken"
import {UnAuthorized} from "../error/errors";



export const generatedToken = (payload:object, secretsPrivateBase64: string ) => {
    const secretsPrivate = Buffer.from(secretsPrivateBase64, 'base64').toString('utf-8')
    const key= Buffer.from(secretsPrivate, 'base64')
    return sign({...payload}, `${key}`)
}
export const verifyTokenOrThrow = (token: string, secretsPublicBase64: string)  => {
    const secretsPublic = Buffer.from(secretsPublicBase64, 'base64').toString('utf-8')
    const key= Buffer.from(secretsPublic, 'base64')
    const payload = verify(token, key) as JwtPayload
    if (!payload) {
        throw new UnAuthorized()
    }
    return payload;
}