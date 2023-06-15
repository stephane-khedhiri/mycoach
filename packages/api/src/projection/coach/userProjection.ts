import {Exclude, Expose, Type} from 'class-transformer'

export class UserProjection {
    id: string
    email: string

    @Expose({name: 'secretKey'})
    password: string
    createdAt: Date
}