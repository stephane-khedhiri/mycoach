import {DataSource} from "typeorm";

export class CommandeRepository {
    constructor(private readonly db: DataSource) {}
}