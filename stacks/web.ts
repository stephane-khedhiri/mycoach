import {StaticSite, StackContext, use} from "sst/constructs";
import {ApiStack} from './Api'

export function WebStack({stack} : StackContext) {
    const { api } = use(ApiStack)
    const web = new StaticSite(stack, 'web', {
        path: "packages/web",
        buildCommand: "npm run build",
        buildOutput : "build",
        environment: {
            REACT_APP_API_URL: api.url
        }
    })
    stack.addOutputs({
        Site: web.url
    })

}