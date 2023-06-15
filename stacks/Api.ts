import {Api, RDS, StackContext} from "sst/constructs";

export function ApiStack({stack}: StackContext) {
    const cluster = new RDS(stack, "Cluster", {
        engine: "postgresql11.13",
        defaultDatabaseName: "myCoach",
        migrations: "services/migrations",
    });
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [cluster],
            },
        },
        routes: {
            "GET /": "packages/apiCoach/src/lambda/list.handler",
            "GET /{id}": "packages/apiCoach/src/lambda/get.handler",
            "POST /": "packages/apiCoach/src/lambda/add.handler",
            "PUT /": "packages/apiCoach/src/lambda/update.handler",
        },

    });
    stack.addOutputs({
        ApiEndpoint: api.url,
        SecretArn: cluster.secretArn,
        ClusterIdentifier: cluster.clusterIdentifier,
    });
}