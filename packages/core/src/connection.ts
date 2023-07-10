import {DataSource} from "typeorm";
import {RDS} from "sst/node/rds";
import {entities} from "./entities";
import {migrations} from "./migrations";

export const connection = () => {
    return new DataSource({
        type: 'aurora-postgres',
        region: process.env.AWS_REGION as string,
        database: RDS.cluster.defaultDatabaseName,
        resourceArn: RDS.cluster.clusterArn,
        secretArn: RDS.cluster.secretArn,
        entities,
        migrations,
    })
}