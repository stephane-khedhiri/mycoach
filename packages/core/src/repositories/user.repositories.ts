import type {DataSource} from "typeorm"
import {UserEntity} from "../entities/user.entity";



export class UserRepository {
    constructor(private readonly db: DataSource ) {}


    public all() {
        return this.db.getRepository(UserEntity).find()
    }
}

