import {Api} from "./index";
import {OfferTypes} from "./offers.service";

export type CoachType = {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    offers: OfferTypes[]
    apiStripe: string |undefined
}

export type CoachWithTokenType = {accessToken: string, data: CoachType}

export type CoachLoginType = Pick<CoachType, 'email' | 'password'>
class CoachService  {
    create(coach:CoachType ) {
        return Api.post<CoachWithTokenType>("/coach", coach)
    }
    login(login: CoachLoginType){
        return  Api.post<CoachWithTokenType>("/login", login)

    }
    gets() {
        return Api.get<CoachType[]>("/coachs")
    }
    getProfile() {
        return Api.get<CoachType>('/coach/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data)
}

}
export default new CoachService()