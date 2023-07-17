import {CreateCoachDto} from "@mycoach/core/dto/coach/create.coach.dto";
import {validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, UserBadRequest} from "@mycoach/core/error/errors";
import {CoachRepository} from "@mycoach/core/src/repositories/";
import {generatedToken} from "@mycoach/core/util/jwt";
import {Config} from "sst/node/config";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {DataProjection} from "@mycoach/core/projection";


const datasource = connection()
const coachRepository = new CoachRepository(datasource)

export const handler = async (event: APIGatewayProxyEventV2) => {
    try {

        const createCoachDto = Object.assign(CreateCoachDto, JSON.parse(event.body ?? ''))

        const errors = validateSync(createCoachDto);

        if (errors.length > 0) {
            throw new UserBadRequest(errors)
        }

        const user = await coachRepository.create(createCoachDto)

        return responseToJson(
            plainToInstance(
                DataProjection,
                {
                    accessToken: generatedToken(
                        {id: user.id, email: user.email},
                        Buffer.from(Config.PRIVATE_KEY, 'base64')
                    ),
                    data: [user]
                }), 200)

    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }


}