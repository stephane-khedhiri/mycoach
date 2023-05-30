import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import {IDatabase} from "./idatabase";

export const db = new Kysely<IDatabase>({
    dialect: new DataApiDialect({
        mode: "postgres",
        driver: {
            database: RDS.Cluster.defaultDatabaseName,
            secretArn: RDS.Cluster.secretArn,
            resourceArn: RDS.Cluster.clusterArn,
            client: new RDSData({}),
        },
    })
})
