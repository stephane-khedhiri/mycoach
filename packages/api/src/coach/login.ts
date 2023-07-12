import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {LoginCoachDto} from "@mycoach/core/dto/coach/login.coach.dto";
import {validateSync} from "class-validator";
import {DomainError, UserBadRequest, UserNotFound} from "@mycoach/core/error/errors";
import {UserRepository} from "@mycoach/core/repositories";
import {plainToClass, plainToInstance} from "class-transformer";
import {UserProjection} from "@mycoach/core/projection/coach/userProjection";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt";
import {comparePassword} from "@mycoach/core/util/password";
import {connection} from "@mycoach/core/connection";
import {TokenProjection} from "@mycoach/core/projection/token.projection";
import {responseToJson} from "@mycoach/core/response";

const datasource = connection()
const userRepository = new UserRepository(datasource)
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const loginCoachDto = Object.assign(LoginCoachDto, JSON.parse(event.body ?? ''))
        const errors = validateSync(loginCoachDto)
        if (errors.length > 0) {
            throw new UserBadRequest(errors)
        }
        const user = await userRepository.userByEmail(loginCoachDto.email)

        if (!user) {
            throw new UserNotFound()

        }

        if (!comparePassword(loginCoachDto.password, user.password)) {
            throw new UserNotFound()
        }
        return responseToJson(
            {
                ...plainToInstance(TokenProjection, {
                    AccessToken: generatedToken({id: user.id, email: user.email}, Config.PUBLIC_KEY),
                })
            },
            200)
    } catch (e: DomainError | any) {
        console.log(e)
        const statusCode = e.code ?? 500
        const body = typeof e.toJson === 'function' ? e.toJson() : e.message
        return responseToJson(body, statusCode)

    }
}