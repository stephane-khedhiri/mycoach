import {UserEntity} from "./users";
import {OfferEntity} from "./offer.entity";
import {CoachEntity} from "./coach.entity";

export type UserEntityType = typeof UserEntity.prototype
export type OfferEntityType = typeof OfferEntity.prototype
export type CoachEntityType = typeof CoachEntity.prototype
export const entities = [CoachEntity, OfferEntity];
