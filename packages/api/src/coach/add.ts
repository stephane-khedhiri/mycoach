import {CreateCoachDto} from "@mycoach/core/dto/coach/create.coach.dto";
import {validateSync, validate} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, UserBadRequest} from "@mycoach/core/error/errors";
import {UserRepository} from "@mycoach/core/src/repositories/";
import {UserProjection} from "@mycoach/core/projection/coach/userProjection";
import {generatedToken} from "@mycoach/core/util/jwt";
import {Config} from "sst/node/config";
import {connection} from "@mycoach/core/connection";


const datasource = connection()
const userRepository = new UserRepository(datasource)

export const handler = async (event: APIGatewayProxyEventV2 ) => {
    try {

        const createCoachDto = Object.assign(CreateCoachDto, JSON.parse(event.body?? ''))

        const errors = validateSync(createCoachDto);

        if(errors.length > 0) {
            throw new UserBadRequest(errors)
        }

        const user = await userRepository.create(createCoachDto)

        const accessToken = generatedToken({id: user.id, email: user.email}, Config.PRIVATE_KEY)
        return {
            statusCode: 200,
            body: JSON.stringify(plainToInstance(UserProjection, {...user, accessToken}))
        }

    }catch (e: DomainError | any) {
        return {
            statusCode: e.code ?? 500,
            body: typeof e.toJson === 'function' ? e.toJson() : e.message
        }
    }


}