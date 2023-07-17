import {Expose} from 'class-transformer'

export class UserProjection {
    @Expose()
    id: string
    @Expose()
    email: string
    password: string
}