import {FunctionComponent} from 'react'
import { Layout } from '../ui/layout/index'
import {useQuery} from "react-query";
import OffersService from "../service/offers.service";
import {CradList} from "../ui/layout/component/card";


export const Home: FunctionComponent = () => {
    const { data, isLoading } = useQuery('offers', async ()  => {
        const {data} = await OffersService.gets()
        return Object.values(data)[0]
    })

    if(isLoading) return <div>Loading...</div>;
    console.log(data)
    return (
        <Layout>

            {isLoading ?
                <div>Loading..</div>
                :
                Array.isArray(data)?
                    <CradList contents={data}/>
                    :
                    <div> aucune offer pour le moment</div>
            }


        </Layout>
    )
}