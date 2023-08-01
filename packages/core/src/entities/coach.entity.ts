import {Column, Entity, OneToMany} from "typeorm";
import {UserEntity} from "./users";
import {OfferEntity} from "./offer.entity";
import {CommandeEntity} from "./commande.entity";


@Entity('coachs')
export class CoachEntity extends UserEntity {
    @Column()
    apiPaypal: string
    @OneToMany(() => OfferEntity, (offers) => offers.coach)
    offers: OfferEntity[]
    @OneToMany(() => CommandeEntity, (commandes) => commandes.coach)
    commandes: CommandeEntity[]

}