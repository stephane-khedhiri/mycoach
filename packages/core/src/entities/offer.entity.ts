import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {CoachEntity} from "./coach.entity";

@Entity('offers')
export class OfferEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('decimal', {precision:10, scale: 2})
    price: number

    @Column()
    description: string

    @ManyToOne(() => CoachEntity, (coach) => coach.offers)
    coach: CoachEntity

}