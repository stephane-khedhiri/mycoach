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
    const API_PAYPAL_KEY = new Config.Secret(stack, "API_PAYPAL_KEY")
    const STRIPE_CLIENT_ID = new Config.Secret(stack, "STRIPE_CLIENT_ID")
    const STRIPE_CLIENT_ID_SECRET = new Config.Secret(stack, "STRIPE_CLIENT_ID_SECRET")
    const STRIPE_WEBHOOKS_SECRET = new Config.Secret(stack, "STRIPE_WEBHOOKS_SECRET")

    // create Api
    const api = new Api(stack, "Api", {
        cors: {
            allowMethods: ["POST","PUT", "GET", "DELETE"],
            allowOrigins: ["http://localhost:5173"],
            exposeHeaders: ["*"],
            allowHeaders:["*"]
        },
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
            "GET /coachs": {
                function: {
                    handler: "packages/api/src/coach/list.handler",
                },
                authorizer: "none"
            } ,
            "GET /coach/profile": "packages/api/src/coach/profile.handler",
            "POST /coach": {
                function: {
                    handler: "packages/api/src/coach/register.handler",
                    bind: [PRIVATE_KEY],
                    environment: {
                        APP_MODE: app.mode
                    },
                    nodejs: {
                        loader: {
                            ".html": "text"
                        },
                        minify: false,
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
                    }
                },
                authorizer: "none",
            },
            "PUT /coach": {
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
            "DELETE /offers/{id}": "packages/api/src/offer/delete.handler",
            "GET /offers/current": "packages/api/src/offer/current.handler",
            "GET /offers/{id}": {
                function:{
                    handler: "packages/api/src/offer/offer.handler",
                },
                authorizer: "none"
            },
            // commandes
            "GET /commandes": "packages/api/src/commande/commandes.handler",
            // payments create session stripe
            "POST /payments": {
                function: {
                  handler: "packages/api/src/payment/payment.handler",
                    bind: [STRIPE_CLIENT_ID, STRIPE_CLIENT_ID_SECRET]
                },
                authorizer:"none"
            },
            // webhoods
            "POST /payments/webhooks": {
                function: {
                    handler: "packages/api/src/payment/payment.webhooks.handler",
                    bind: [STRIPE_WEBHOOKS_SECRET, STRIPE_CLIENT_ID_SECRET]
                },
                authorizer:"none"
            },
        },

    });

    // create fixture lambda
    if (app.stage !== 'prod') {
        const fixture = new Function(stack, 'fixture', {
            handler: 'packages/api/src/fixture.load',
            bind: [cluster, API_PAYPAL_KEY],
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