import {DataSource} from "typeorm";

export class SportsmanRepository {
    constructor(private readonly db: DataSource) {}
}