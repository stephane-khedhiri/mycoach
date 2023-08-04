import React, {FC} from "react";
import './index.css'


type CardListPropsType = {
    children : React.ReactNode | React.ReactNode[]
}
export const CradList : FC<CardListPropsType> = ({children}) => {

    return(
        <div className={'cradlist'}>
            {children}
        </div>
    )
}