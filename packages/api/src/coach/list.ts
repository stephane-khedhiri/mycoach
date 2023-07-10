import "reflect-metadata"
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {UserRepository} from "../../repositories/user.repositories";
import {UserPayloadWithJwt} from "../../types";

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