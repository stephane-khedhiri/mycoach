import {FunctionComponent} from 'react'
import {useQuery} from "react-query";
import {CradList} from "../ui/layout/component/card";
import {CradCoach} from "../ui/layout/component/card/components/crad.coach";
import CoachService from "../service/coach.service";


export const PageHome: FunctionComponent = () => {
    const {data, isLoading} = useQuery('coach', async () => {
        const {data} = await CoachService.gets()
        return data
    })

    return (
        <>

            {isLoading ?
                <div>Loading..</div>
                :
                Array.isArray(data) ?
                    <CradList>
                        {data.map((item, index) =>
                            (<CradCoach key={index} lastName={item.lastName} firstName={item.firstName} coachId={item.id}/>)
                        )}
                    </CradList>
                    :
                    <div> aucune offer pour le moment</div>
            }
        </>
    )
}