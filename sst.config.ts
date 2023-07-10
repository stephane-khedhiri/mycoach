import "reflect-metadata"
import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/Api";
import {WebStack} from "./stacks/web";
import {RemovalPolicy} from "aws-cdk-lib";
import {esbuildDecorators} from "@anatine/esbuild-decorators";




export default {
  config(_input) {
    return {
      name: "mycoach",
      region: "eu-west-3",
    };
  },
  stacks(app) {

    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      timeout: 20
    })

    if(app.stage !== 'prod'){
      app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY)
    }
    app
        .stack(ApiStack)
        .stack(WebStack);
  }
} satisfies SSTConfig;
