import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CommandeEntity} from "./commande.entity";

@Entity('sportsmen')
export class SportsmenEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    email: string
    @OneToMany(() => CommandeEntity, (commandes) => commandes.sportsman)
    commandes: CommandeEntity[]
}