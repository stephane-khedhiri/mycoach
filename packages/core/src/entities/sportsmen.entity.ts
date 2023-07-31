import {Column, Entity, OneToMany} from "typeorm";
import {CommandeEntity} from "./commande.entity";

@Entity('sportsmen')
export class SportsmenEntity {
    @Column()
    email: string
    @OneToMany(() => CommandeEntity, (commandes) => commandes.sportsman)
    commandes: CommandeEntity[]
}