import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoachEntity} from "./coach.entity";
import {SportsmenEntity} from "./sportsmen.entity";

@Entity('commandes')
export class CommandeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({type: 'json'})
    content: string[]

    @Column()
    price: number
}