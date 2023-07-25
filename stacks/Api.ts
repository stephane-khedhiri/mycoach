import {Api, RDS, StackContext, Function, Config, Script} from "sst/constructs";
import {esbuildDecorators} from "@anatine/esbuild-decorators";
import * as path from "path";


export function ApiStack({stack, app}: StackContext) {
    // create database
    const cluster = new RDS(stack, "Cluster", {
        engine: "mysql5.7",
        defaultDatabaseName: "myCoach",
        scaling: {
            autoPause: true,
            minCapacity: "ACU_1",
            maxCapacity: "ACU_1",
        }
    });
    // get variable in could
    const PUBLIC_KEY = new Config.Secret(stack, "PUBLIC_KEY");
    const PRIVATE_KEY = new Config.Secret(stack, "PRIVATE_KEY");

    // create Api
    const api = new Api(stack, "Api", {
        authorizers: {
            myAuth: {
                type: "lambda",
                responseTypes: ["simple"],
                function: new Function(stack, "Authorizer", {
                    handler: "packages/api/src/auth.handler",
                    bind: [PUBLIC_KEY, cluster],
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
            authorizer: 'myAuth',
        },
        routes: {
            // route coach
            "GET /": "packages/api/src/coach/list.handler",
            "GET /{id}": "packages/api/src/coach/get.handler",
            "POST /": {
                function: {
                    handler: "packages/api/src/coach/register.handler",
                    bind: [PRIVATE_KEY]
                },
                authorizer: "none",
            },
            "PUT /": {
                function: {
                    handler: "packages/api/src/coach/update.handler",
                    bind: [PRIVATE_KEY]
                }
            },
            "POST /login": {
                function: {
                    handler: "packages/api/src/coach/login.handler",
                    bind: [PRIVATE_KEY]
                },
                authorizer: "none"
            },
            //offers
            "POST /offers": "packages/api/src/offer/register.handler",
            "PUT /offers/{id}": "packages/api/src/offer/update.handler",
            "GET /offers": {
                function :{
                    handler: "packages/api/src/offer/offers.handler"
                },
                authorizer: "none"
            },
        },

    });

    // create fixture lambda
    if (app.stage !== 'prod') {
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
        if (app.mode !== 'dev') {
            new Script(stack, 'fixtureLoad', {
                version: '1',
                onCreate: fixture
            })
        }
    }
// Show the API endpoint in the output
    stack.addOutputs({
        RDSEndpoint: cluster.clusterEndpoint.socketAddress,
        ApiEndpoint: api.url,

    });
    return {api}
}