import "reflect-metadata"
import {APIGatewayProxyHandlerV2WithLambdaAuthorizer} from "aws-lambda";
import {UserRepository} from "@mycoach/core/repositories/user.repositories";
import {UserPayloadWithJwt} from "@mycoach/core/types";
import {connection} from "@mycoach/core/connection";
const datasource = connection()
const userRepository = new UserRepository(datasource)
export const handler: APIGatewayProxyHandlerV2WithLambdaAuthorizer<UserPayloadWithJwt> = async (event) => {
    await datasource.initialize()
    try {
        const users = await userRepository.all()
        return {
            statusCode: 200,
            body: JSON.stringify(users)
        }
    }catch (e: any) {
        return {
            statusCode:500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e.message)
        }
    }finally {
        if(datasource.isInitialized){
            await datasource.destroy()
        }
    }

}