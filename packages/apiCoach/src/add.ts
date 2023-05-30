import {createCoach} from "@mycoach/core/repositories/coach.repositories"
import { useJsonBody } from "sst/node/api";
import {CoachTypes} from "@mycoach/core/database/idatabase";

export const add = async () => {
    const datas = useJsonBody()

    const res = await createCoach(datas)

    return {
        statusCode:200,
        body: res
    }


}