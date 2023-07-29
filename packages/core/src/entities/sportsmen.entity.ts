import {UserEntity} from "./users";
import {Entity, OneToMany} from "typeorm";

@Entity('sportsMen')
export class SportsmenEntity extends UserEntity{

}