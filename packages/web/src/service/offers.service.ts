import {Api} from "./index";



export type OfferTypes = {
    id: string;
    name: string;
    content: string[];
    price: string;
    currency: string
}

class OffersService  {
    currents(){
        return Api.get<OfferTypes[]>("/offers/current", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data)
    }
    get(id: string){
        return Api.get<OfferTypes>(`/offers/${id}`).then(response => response.data)
    }
    remove(id:string) {
        return Api.delete<OfferTypes>(`/offers/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data)
    }


}
export default new OffersService()