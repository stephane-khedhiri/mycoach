import "reflect-metadata"
import {Users} from "../entity/users";
import {Database} from "../database/dataSource";
import {Connection} from "typeorm";


export class UserRepository extends Database {
    private UserRepository = this.db.getRepository<Users>(Users)

     all = () => {
        const users = this.UserRepository.find()
            this.db.close()
         return users;
    }

}

