import "reflect-metadata"
import {CreateCoachDto} from "@mycoach/core/dto/coach/create.coach.dto";
import {validate, validateSync} from "class-validator";
import {APIGatewayProxyEventV2} from "aws-lambda";
import {plainToInstance} from 'class-transformer';
import {DomainError, UserBadRequest} from "@mycoach/core/error/errors";
import {CoachRepository} from "@mycoach/core/src/repositories/";
import {generatedToken} from "@mycoach/core/util/jwt";
import {responseToJson} from "@mycoach/core/response";
import {DataProjection} from "@mycoach/core/projection";
import {Mailer} from "@mycoach/core/mailer";
import template from "./../../../../template/register.coach.html"
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {Config} from "sst/node/config"
import {DataSource} from "typeorm";

// connection database
const coachRepository = new CoachRepository(new DataSource(databaseConfig))

const mailer = new Mailer()

// mailer
export const handler = async (event: APIGatewayProxyEventV2) => {
    try {
        const createCoachDto = plainToInstance(CreateCoachDto, JSON.parse(event.body ?? ''))
        const errors = await validate(createCoachDto);

        if (errors.length > 0) {
            throw new UserBadRequest(errors)
        }

        const user = await coachRepository.create(createCoachDto)
        if(user){
             await mailer.send({
                 from: 'noreplay@mycoch.com',
                 to: user.email,
                 subject: 'register',
                 template: {
                     data: user,
                     content: template
                 }
             })
        }
        return responseToJson(
            plainToInstance(
                DataProjection,
                {
                    accessToken: generatedToken(
                        {id: user.id, email: user.email},
                        Buffer.from(Config.PRIVATE_KEY, 'base64')
                    ),
                    data: [user]
                }, {excludeExtraneousValues: true}), 200)

    } catch (e: DomainError | any) {
        if (e instanceof DomainError) {
            return responseToJson(e.toPlain(), e.code)
        }
        return responseToJson(e.message, 500)
    }


}