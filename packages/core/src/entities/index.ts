import {UserEntity} from "./users";
import {OfferEntity} from "./offer.entity";
import {CoachEntity} from "./coach.entity";

import {SportsmenEntity} from "./sportsmen.entity";

export type UserEntityType = typeof UserEntity.prototype

export const entities = [CoachEntity, OfferEntity, SportsmenEntity];
