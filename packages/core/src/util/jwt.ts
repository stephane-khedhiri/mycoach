import {JwtPayload, sign, verify} from "jsonwebtoken"
import {UnAuthorized} from "../error/errors";


export const generatedToken = (payload: object, secretsPrivateBase64: string) => {
    const secretsPrivate = Buffer.from(secretsPrivateBase64, 'base64').toString('utf-8')
    return sign(
        {...payload},
        secretsPrivate,
        {
            algorithm: "RS256",
            expiresIn: 15 * 60000, // 15m
        })
}
export const verifyTokenOrThrow = (token: string, secretsPublicBase64: string): Promise<JwtPayload> => {
    const secretsPublic = Buffer.from(secretsPublicBase64, 'base64').toString('utf-8')
    return new Promise((resolve) => {
        verify(token, secretsPublic, {algorithms: ["RS256"]}, (error, decoded) => {
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