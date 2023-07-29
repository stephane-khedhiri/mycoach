import {UserEntity} from "./users";
import {Entity, OneToMany} from "typeorm";
import {CommandeEntity} from "./commande.entity";
@Entity('sportsMen')
export class SportsmenEntity extends UserEntity{
    @OneToMany(() => CommandeEntity, (commandes) => commandes.sportsman)
    commandes: CommandeEntity[]
}