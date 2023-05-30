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
            "GET /": "packages/apiCoach/src/list.handler",
            "GET /{id}": "packages/api/src/get.handler",
            "POST /create": "packages/api/src/add.handler",
        },

    });
    stack.addOutputs({
        ApiEndpoint: api.url,
        SecretArn: cluster.secretArn,
        ClusterIdentifier: cluster.clusterIdentifier,
    });
}