import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CoachEntity} from "./coach.entity";
import {SportsmenEntity} from "./sportsmen.entity";
import {OfferEntity} from "./offer.entity";

@Entity('commandes')
export class CommandeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    paymentId: string

    @ManyToOne(() => CoachEntity, (coach) => coach.commandes)
    coach: CoachEntity

    @ManyToOne(() => OfferEntity, (offer) => offer.commandes)
    offer: OfferEntity

    @ManyToOne(() => SportsmenEntity, (sportsMan) => sportsMan.commandes)
    sportsman: SportsmenEntity

}