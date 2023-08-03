import {Api} from "./index";
import {AxiosResponse} from "axios";


export type CoachType = {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    apiPaypal?: string
}

export type CoachWithTokenType = {accessToken: string, data: CoachType[]}

export type CoachLoginType = Omit<CoachType, 'lastName' | 'firstName' | 'apiPaypal' |'id'>
class CoachService  {
    create(coach:CoachType ): Promise<AxiosResponse<CoachWithTokenType>>  {
        return Api.post("/coach", coach)
    }
    login(login: CoachLoginType): Promise<AxiosResponse<CoachWithTokenType>>{
        return  Api.post("/login", login)

    }
    gets(): Promise<AxiosResponse<CoachType[]>> {
        return Api.get("/coach")
    }
    getProfile(): Promise<AxiosResponse<CoachType>> {
        return Api.get('/coach/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data)
}

}
export default new CoachService()