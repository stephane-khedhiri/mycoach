import {SSTConfig} from "sst";
import {ApiStack} from "./stacks/Api";
import {RemovalPolicy} from "aws-cdk-lib";

export default {
  config(_input) {
    return {
      name: "mycoach",
      region: "eu-west-3",
    };
  },
  stacks(app) {
    if(app.stage !== 'prod'){
      app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY)
    }
    app.stack(ApiStack);
  }
} satisfies SSTConfig;
