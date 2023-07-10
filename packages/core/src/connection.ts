import {DataSource} from "typeorm";
import {RDS} from "sst/node/rds";
import {entities} from "./entities";
import {migrations} from "./migrations";

export const connection = () => {
    return new DataSource({
        type: 'aurora-postgres',
        region: process.env.AWS_REGION as string,
        database: RDS.Cluster.defaultDatabaseName,
        resourceArn: RDS.Cluster.clusterArn,
        secretArn: RDS.Cluster.secretArn,
        entities,
        migrations,
    })
}