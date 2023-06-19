import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {CoachRepository} from "../../repositories/coach.repositories";
import {Config} from "sst/node/config";
import {UserPayloadWithJwt} from "../../types";

export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {
    try {
        console.log(event.requestContext.authorizer.lambda.email)
        const coachs = await new CoachRepository().all()
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