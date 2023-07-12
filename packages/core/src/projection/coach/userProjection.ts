import {Exclude} from 'class-transformer'

export class UserProjection {
    id: string
    email: string

    @Exclude()
    password: string
}