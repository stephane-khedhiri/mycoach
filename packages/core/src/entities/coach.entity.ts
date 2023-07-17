import {Column, Entity, OneToMany} from "typeorm";
import {UserEntity} from "./users";
import {OfferEntity} from "./offer.entity";


@Entity('coachs')
export class CoachEntity extends UserEntity {
    @Column()
    firstName: string
    @Column()
    lastName: string
    @OneToMany(() => OfferEntity, (offers) => offers.coach)
    offers: OfferEntity[]
}