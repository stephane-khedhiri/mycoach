import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {LoginCoachDto} from "@mycoach/core/dto/coach/login.coach.dto";
import {validateSync} from "class-validator";
import {DomainError, UserBadRequest, UserNotFound} from "@mycoach/core/error/errors";
import {CoachRepository} from "@mycoach/core/repositories";
import {plainToInstance} from "class-transformer";
import {Config} from "sst/node/config";
import {generatedToken} from "@mycoach/core/util/jwt";
import {comparePassword} from "@mycoach/core/util/password";
import {connection} from "@mycoach/core/connection";
import {responseToJson} from "@mycoach/core/response";
import {DataProjection} from "@mycoach/core/projection";

const datasource = connection()
const coachRepository = new CoachRepository(datasource)
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const loginCoachDto = plainToInstance(LoginCoachDto, JSON.parse(event.body ?? ''))
        const errors = validateSync(loginCoachDto)
        if (errors.length > 0) {
            throw new UserBadRequest(errors)
        }
        const user = await coachRepository.userByEmail(loginCoachDto.email)

        if (!user) {
            throw new UserNotFound()

        }

        if (!comparePassword(loginCoachDto.password, user.password)) {
            throw new UserNotFound()
        }
        return responseToJson(
            plainToInstance(DataProjection, {
                accessToken: generatedToken(
                    {id: user.id, email: user.email},
                    Buffer.from(Config.PRIVATE_KEY, 'base64')
                ),
                data: [user]
            }
            ,{excludeExtraneousValues: true})
            ,200)
    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)

    }
}