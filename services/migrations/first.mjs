import {Kysely, sql} from "kysely";
import * as string_decoder from "string_decoder";
/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
    // create extension for uuid
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
    // create coachs table
    await db.schema
        .createTable(`coachs`)
        .addColumn("id", "uuid", (col) =>
            col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
        )
        .addColumn(`email`, "varchar", (col) =>
            col.unique().notNull()
        )
        .addColumn(`password`, "varchar", (col) =>
            col.notNull()
        )
        .addColumn("createAt", "timestamp", (col) =>
            col.defaultTo(sql`now()`)
        )
        .$call((qb) => {
            console.log(qb.compile());
            return qb;
        })
        .execute();





    // coach table personal_informations_coach

    await db.schema
        .createTable("personalInformationsCoach")
        .addColumn("coachId", "uuid", (col) =>
            col.references('coachs.id').onDelete('cascade').notNull()
        )
        .addColumn('firstName', "varchar(10)", (col) =>
            col.notNull()
        )
        .addColumn('lastName', "varchar(10)", (col) =>
            col.notNull()
        )
        .addColumn("experience", "numeric")
        .addColumn("presentation", 'text', (col) =>
            col.notNull()
        )
        .addColumn("avatar", "varchar")
        .$call((qb) => {
            console.log(qb.compile());
            return qb;
        })
        .execute()

    // coach table clients
    /**
     *  await db.schema
     *         .createTable("users")
     *         .addColumn("uuid", "serial", (col) =>
     *             col.defaultTo(sql(`uuid()`))
     *         )
     *
     *         .addColumn("email", "varchar(255)", (col) =>
     *             col.unique().notNull()
     *         )
     *         .addColumn("password", "varchar(255)", (col) =>
     *             col.notNull()
     *         )
     *         .addColumn("firstName", "varchar(10)", (col) =>
     *             col.notNull()
     *         )
     *         .addColumn("lastName", "varchar(10)", (col) =>
     *             col.notNull()
     *         )
     *         .addColumn("coachUuid", "serial", (col) =>
     *             col.references('coachs.uuid')
     *         )
     *         .execute()
     */

}

/**
 * @param db {Kysely<any>}
 */
export async function down (db) {
    await db.schema.dropTable('users').execute()
    await db.schema.dropTable('personalInformationsCoach').execute()
    await db.schema.dropTable('coachs').execute()
}