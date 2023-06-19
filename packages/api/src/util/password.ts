import {genSaltSync, compareSync, hashSync} from "bcryptjs"





export const encodePassword = (plainTextPassword: string): string => {
    const salt = genSaltSync(Math.floor(Math.random()* (10-20)))
    return hashSync(plainTextPassword, salt)
}

export const comparePassword = (plainTextPassword: string, hashPassword: string) : boolean => {
    return compareSync(plainTextPassword, hashPassword)
}