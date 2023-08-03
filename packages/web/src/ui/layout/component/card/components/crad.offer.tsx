import {FC, } from "react";
import {NavLink} from "react-router-dom";
import './crad.offer.css'
export type OfferProps =  {
    id: string
    contents: string[]
    name: string
    price: string

}
export const CradOffer : FC<OfferProps> = ({id,contents,name, price}) => {

    return (
        <div
            className="offer">
            <h5>{name}</h5>
            <div>
                <span>$</span>
                <span>{price}</span>

            </div>
            <ul role="list">
                {Array.isArray(contents) &&
                    contents.map((item, index) => (
                        <li key={index}>
                            <svg  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span>{item}</span>
                        </li>

                    ))
                }


            </ul>
            <NavLink to={`/offer/${id}`}>
                Choose
            </NavLink>
        </div>
    )
}