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
            "GET /": "packages/api/src/lambda/coach/list.handler",
            "GET /{id}": "packages/api/src/lambda/coach/get.handler",
            "POST /": "packages/api/src/lambda/coach/add.handler",
            "PUT /": "packages/api/src/lambda/coach/update.handler",
        },

    });
    stack.addOutputs({
        ApiEndpoint: api.url,
        SecretArn: cluster.secretArn,
        ClusterIdentifier: cluster.clusterIdentifier,
    });
}