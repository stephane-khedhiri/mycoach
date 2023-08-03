import {Api} from "./index";
import {AxiosResponse} from "axios";


export type OfferTypes = {
    id: string;
    name: string;
    content: string[];
    price: string;
}

class OffersService  {
    gets() :Promise<AxiosResponse<OfferTypes[]>>{
        return Api.get("/offers").then(response => response.data)
    }
    get(id: string): Promise<AxiosResponse<OfferTypes>>{
        return Api.get(`/offers/${id}`).then(response => response.data)
    }


}
export default new OffersService()