import { DataSource } from "typeorm";
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import {databaseConfig} from "@mycoach/core/config/database.conf";
import {Config} from "sst/node/config"
import * as path from "path";

const datasource = new DataSource(databaseConfig)
export const load = async () => {
    try {
        await datasource.initialize();

        await datasource.synchronize(true);
        const loader = new Loader();
        loader.load(path.resolve(path.join(process.env.IS_LOCAL ? process.cwd() : __dirname, 'fixtures')));

        const resolver = new Resolver();
        const fixtures = resolver.resolve(loader.fixtureConfigs);
        const builder = new Builder(datasource, new Parser(), false);

        for (const fixture of fixturesIterator(fixtures)) {
            const entity: any = await builder.build(fixture);
            // edit apipaypal to config secret key
            if(fixture.entity === 'CoachEntity'){
                entity.apiPaypal = Config.API_PAYPAL_KEY
            }
            if(fixture.entity === 'CommandeEntity'){
                entity.content = JSON.stringify(entity.content)
            }

            await datasource.getRepository(fixture.entity).save(entity);
        }
    } catch (err) {
        throw err;
    } finally {
        if (datasource) {
            await datasource.destroy();
        }
    }

    return {
        statusCode: 200,
        body: 'loaded',
    }
}