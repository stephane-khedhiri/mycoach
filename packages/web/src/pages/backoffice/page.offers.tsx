import {FC} from "react";
import {useQuery} from "react-query";
import OffersService from "../../service/offers.service";
import {CradList} from "../../ui/layout/component/card";
import {CradOffer} from "../../ui/layout/component/card/components/crad.offer";
import {Button} from "../../ui/layout/component/button";


export const PageOffers: FC = () => {
    const {data, isLoading, error} = useQuery('offers', async () => {
        const {data} = await OffersService.currents()
        return data
    })
    return (
        <>
            {isLoading ?
                <div>Loading..</div>
                :
                <>
                    {Array.isArray(data) ?
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
            }
        </>
    )
}