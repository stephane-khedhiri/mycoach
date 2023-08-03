import {Api} from "./index";
import {AxiosResponse} from "axios";

export type ApiResponseOfferTypes =  AxiosResponse<OfferTypes[]>
export type OfferTypes = {
    id: string;
    name: string;
    content: string[];
    price: string;
}

class OffersService  {
    gets() :Promise<ApiResponseOfferTypes>{
        return Api.get("/offers")
    }

}
export default new OffersService()