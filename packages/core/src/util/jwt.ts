import {JwtPayload, sign, verify} from "jsonwebtoken"
import {UnAuthorized} from "../error/errors";


export const generatedToken = (payload: object, privateKey: Buffer | string) => {
    return sign(
        {...payload},
        typeof privateKey === 'string'? privateKey : privateKey.toString('utf-8'),
        {
            algorithm: "RS256",
            expiresIn: '1h'
        })
}
export const verifyTokenOrThrow = (token: string, publicKey: Buffer | string): Promise<JwtPayload> => {
    return new Promise((resolve) => {
        verify(token, typeof publicKey === 'string'? publicKey : publicKey.toString('utf-8'), {algorithms: ["RS256"]}, (error, decoded) => {
            if (error) {
                throw error
            }
            if (!decoded){
                throw new UnAuthorized()
            }
            resolve(decoded as JwtPayload)
        })
    })


}