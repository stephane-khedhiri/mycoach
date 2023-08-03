import {FunctionComponent} from 'react'
import {useQuery} from "react-query";
import OffersService from "../service/offers.service";
import {CradList} from "../ui/layout/component/card";
import {CradOffer} from "../ui/layout/component/card/components/crad.offer";


export const PageHome: FunctionComponent = () => {
    const {data, isLoading} = useQuery('offers', async () => {
        const {data} = await OffersService.gets()
        return data
    })
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            {isLoading ?
                <div>Loading..</div>
                :
                Array.isArray(data) ?
                    <CradList>
                        {data.map((item, index) =>
                            (<CradOffer key={index} id={item.id} contents={item.content} name={item.name}
                                        price={item.price}/>)
                        )}
                    </CradList>
                    :
                    <div> aucune offer pour le moment</div>
            }
        </>
    )
}