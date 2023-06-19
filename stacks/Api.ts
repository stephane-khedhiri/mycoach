import {Api, RDS, StackContext, Function, Config} from "sst/constructs";


export function ApiStack({stack}: StackContext) {
    const cluster = new RDS(stack, "Cluster", {
        engine: "postgresql11.13",
        defaultDatabaseName: "myCoach",
        migrations: "services/migrations",
    });

    const PUBLIC_KEY = new Config.Secret(stack, "PUBLIC_KEY");
    const PRIVATE_KEY = new Config.Secret(stack, "PRIVATE_KEY")

    const api = new Api(stack, "Api", {
        authorizers: {
            myAuth: {
                type: "lambda",
                responseTypes: ["simple"],
                function: new Function(stack, "Authorizer", {
                    handler: "packages/api/src/lambda/coach/auth.handler",
                    bind: [PUBLIC_KEY]
                }),
                resultsCacheTtl: '5 second'
            }
        },
        defaults: {
            function: {
                bind: [cluster],
            },
            authorizer: 'myAuth',
        },
        routes: {
            "GET /": "packages/api/src/lambda/coach/list.handler",
            "GET /{id}": "packages/api/src/lambda/coach/get.handler",
            "POST /": {
                function : {
                    handler: "packages/api/src/lambda/coach/add.handler",
                    bind: [PRIVATE_KEY]
                },
                authorizer: "none",
            },
            "PUT /": {
                function:{
                    handler: "packages/api/src/lambda/coach/update.handler",
                    bind: [PRIVATE_KEY]
                }
            },
            "POST /login": {
                function:{
                    handler: "packages/api/src/lambda/coach/login.handler",
                    bind: [PUBLIC_KEY]
                },
                authorizer: "none"
            }
        },

    });
    stack.addOutputs({
        ApiEndpoint: api.url,
        SecretArn: cluster.secretArn,
        ClusterIdentifier: cluster.clusterIdentifier,
    });
}