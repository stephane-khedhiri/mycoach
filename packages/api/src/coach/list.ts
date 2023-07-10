import "reflect-metadata"
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {UserRepository} from "@mycoach/core/repositories/user.repositories";
import {UserPayloadWithJwt} from "@mycoach/core/types";

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {
    try {
        const coachs = await new UserRepository().all()
        return {
            statusCode: 200,
            body: JSON.stringify(coachs)
        }
    }catch (e: any) {
        return {
            statusCode:500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e.message)
        }
    }

}