import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/Api";
import {WebStack} from "./stacks/web"

export default {
  config(_input) {
    return {
      name: "mycoach",
      region: "eu-west-3",
    };
  },
  stacks(app) {
    app
        .stack(ApiStack)
        .stack(WebStack);
  }
} satisfies SSTConfig;
