import {connection} from "@mycoach/core/connection";
import type { DataSource } from "typeorm";
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import * as path from "path";

export const load = async () => {
    let datasource: DataSource | undefined
    try {
        datasource = connection()

        await datasource.initialize();
        await datasource.synchronize(true);

        const loader = new Loader();
        loader.load(path.resolve(path.join(__dirname, 'fixtures')));

        const resolver = new Resolver();
        const fixtures = resolver.resolve(loader.fixtureConfigs);
        const builder = new Builder(datasource, new Parser(), false);

        for (const fixture of fixturesIterator(fixtures)) {
            const entity: any = await builder.build(fixture);
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