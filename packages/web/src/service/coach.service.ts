import {Api} from "./index";
import {DataProjection} from "@mycoach/core/src/projection/data.projection"

export type CoachType = {
    email: string
    firstName: string
    lastName: string
    password: string
    apiPaypal: string
}
export type CoachLoginType = Omit<CoachType, 'lastName' | 'firstName' | 'apiPaypal'>
class CoachService  {
    create(coach:CoachType ) {
        Api.defaults.headers.post = { "Access-Control-Allow-Origin": "*"}
        return Api.post<DataProjection>("/coach", coach)
    }
    async login(login: CoachLoginType) {

        return await Api.post<DataProjection>("/login", login)

    }
}
export default new CoachService()