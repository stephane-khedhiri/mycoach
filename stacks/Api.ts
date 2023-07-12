import {Api, RDS, StackContext, Function, Config, Script} from "sst/constructs";
import {esbuildDecorators} from "@anatine/esbuild-decorators";
import * as path from "path";


export function ApiStack({stack, app}: StackContext) {
    // create database
    const cluster = new RDS(stack, "Cluster", {
        engine: "postgresql11.13",
        defaultDatabaseName: "myCoach",
        scaling: {
            autoPause: true,
            minCapacity: "ACU_2",
            maxCapacity: "ACU_2",
        }
    });
    // get variable in could
    const PUBLIC_KEY = new Config.Secret(stack, "PUBLIC_KEY");
    const PRIVATE_KEY = new Config.Secret(stack, "PRIVATE_KEY");

    // create Api
    const api = new Api(stack, "Api", {
        // create authorizers
        authorizers: {
            myAuth: {
                type: "lambda",
                responseTypes: ["simple"],
                function: new Function(stack, "Authorizer", {
                    handler: "packages/api/src/auth.handler",
                    bind: [PUBLIC_KEY]
                }),
                resultsCacheTtl: '5 second'
            }
        },
        defaults: {
            function: {
                timeout: 5,
                bind: [cluster],
                nodejs: {
                    esbuild: {
                        plugins: [
                            // @ts-ignore
                            esbuildDecorators({
                                tsconfig: path.join(process.cwd(), 'packages/api/tsconfig.json')
                            }),
                        ],
                    },
                    external: [
                        'pg-native',
                    ]
                },

            },
            //authorizer: 'myAuth',
        },
        routes: {
            "GET /": "packages/api/src/coach/list.handler",
            // "GET /{id}": "packages/api/src/coach/get.handler",
            "POST /": {
                function: {
                    handler: "packages/api/src/coach/add.handler",
                    bind: [PRIVATE_KEY]
                },
                authorizer: "none",
            },
            // "PUT /": {
            //     function:{
            //         handler: "packages/api/src/coach/update.handler",
            //         bind: [PRIVATE_KEY]
            //     }
            // },
             "POST /login": {
                 function:{
                     handler: "packages/api/src/coach/login.handler",
                     bind: [PUBLIC_KEY]
                 },
                 authorizer: "none"
             }
        },

    });

    // create fixture lambda
    if (app.mode === 'dev') {
        const fixture = new Function(stack, 'fixture', {
            handler: 'packages/api/src/fixture.load',
            bind: [cluster],
            enableLiveDev: false,
            copyFiles: [{from: 'fixtures', to: 'packages/api/src/fixtures'}],
            nodejs: {
                esbuild: {
                    plugins: [
                        // @ts-ignore
                        esbuildDecorators({
                            tsconfig: path.join(process.cwd(), 'packages/api/tsconfig.json')
                        }),
                    ],
                    external: [
                        'pg-native',
                    ]
                }
            }
        })
        new Script(stack, 'fixtureLoad', {
            version: '1',
            onCreate: fixture
        })
    }
// Show the API endpoint in the output
    stack.addOutputs({
        RDSEndpoint: cluster.clusterEndpoint.socketAddress,
        ApiEndpoint: api.url,

    });
    return {api}
}