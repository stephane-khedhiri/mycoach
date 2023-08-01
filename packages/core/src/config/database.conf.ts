import {RDS} from "sst/node/rds";
import {entities} from "../entities";
import {migrations} from "../migrations";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

export const databaseConfig: DataSourceOptions  = {
    type:'aurora-mysql',
    region: process.env.AWS_REGION as string,
    database: RDS.Cluster.defaultDatabaseName,
    resourceArn: RDS.Cluster.clusterArn,
    secretArn: RDS.Cluster.secretArn,
    entities,
    migrations,

}