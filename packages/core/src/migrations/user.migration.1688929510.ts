import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1688929510 implements MigrationInterface {
    down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "firstName",
                        type: 'varchar',
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                    },
                    {
                        name: "createdAd",
                        type: "date",
                        default: Date()
                    }
                ]
            }),
            true,
        )
    }

    up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.dropTable('users');
    }
}