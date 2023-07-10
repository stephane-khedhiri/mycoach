import {JwtPayload} from "jsonwebtoken";

export type UserPayloadWithJwt = Omit<JwtPayload, 'iat'>