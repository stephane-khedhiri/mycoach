import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/Api";
import {WebStack} from "./stacks/web";
import {RemovalPolicy} from "aws-cdk-lib";

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