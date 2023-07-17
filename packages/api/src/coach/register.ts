import {CreateUserDto} from "@mycoach/core/dto/coach/create.user.dto";
import {validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, UserBadRequest} from "@mycoach/core/error/errors";
import {UserRepository} from "@mycoach/core/src/repositories/";
import {generatedToken} from "@mycoach/core/util/jwt";
import {Config} from "sst/node/config";
import {connection} from "@mycoach/core/connection";
import {TokenProjection} from "@mycoach/core/projection/token.projection";
import {responseToJson} from "@mycoach/core/response";



const datasource = connection()
const userRepository = new UserRepository(datasource)

export const handler = async (event: APIGatewayProxyEventV2 ) => {
    try {

        const createCoachDto = Object.assign(CreateUserDto, JSON.parse(event.body?? ''))

        const errors = validateSync(createCoachDto);

        if(errors.length > 0) {
            throw new UserBadRequest(errors)
        }

        const user = await userRepository.create(createCoachDto)

        return responseToJson(
            {
                ...plainToInstance(TokenProjection, {
                    AccessToken: generatedToken({id: user.id, email: user.email}, Buffer.from(Config.PRIVATE_KEY, 'base64')),
                })
            },
            200)

    }catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message(), 500)
    }


}