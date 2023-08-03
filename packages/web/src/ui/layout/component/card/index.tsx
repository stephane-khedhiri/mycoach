import {FC} from "react";
import {CradOffer} from "./components/crad.offer";
import {OfferTypes} from "../../../../service/offers.service";
import './index.css'


type OfferProps = {
    contents: OfferTypes[]
}
export const CradList : FC<OfferProps> = ({contents}) => {
    console.log(Array.isArray(contents))
    return(
        <div className={'offers'}>
            {Array.isArray(contents) &&
                contents.map((data, index) => (
                    <CradOffer key={index} contents={data.content} name={data.name} id={data.id}/>
                ))
            }

        </div>
    )
}