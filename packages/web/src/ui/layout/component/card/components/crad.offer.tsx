import {FC, } from "react";
import {NavLink} from "react-router-dom";

export type OfferProps =  {
    id: string
    contents: string[]
    name: string

}
export const CradOffer : FC<OfferProps> = ({id,contents,name}) => {

    return (
        <div>
            <a href="#">
                <h5>{name}</h5>
            </a>
            {Array.isArray(contents) &&
                <ul>
                    {contents.map((content, index) => <li key={index}>{content}</li>)}
                </ul>
            }
            <NavLink to={`/offer/${id}`}  >
                Read more
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>

            </NavLink>
        </div>
    )
}