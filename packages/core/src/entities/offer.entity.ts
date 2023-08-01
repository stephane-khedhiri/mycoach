import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import {CoachEntity} from "./coach.entity";
import {CommandeEntity} from "./commande.entity";

export enum OfferStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}
@Entity('offers')
export class OfferEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column('decimal', {precision:10, scale: 2})
    price: number
    @Column()
    currency: string

    @Column({type: 'simple-array'})
    content: string[]

    @Column()
    duration: string

    @Column({
        type: "enum",
        enum: OfferStatus,
        default: OfferStatus.ACTIVE
    })
    status: OfferStatus
    @OneToMany(()=>CommandeEntity, (commande)=> commande.offer)
    commandes: CommandeEntity[]
    @ManyToOne(() => CoachEntity, (coach) => coach.offers)
    coach: CoachEntity

}