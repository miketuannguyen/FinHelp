import { UserEntity } from './entities';
import { Connection, createConnection } from 'typeorm';
import { Helpers } from './utils';

export class MySQLDatabase {
    private static _connection: Connection;

    /** Constructor */
    private constructor() {}

    /**
     * Create MySQL connection
     * @returns success / fail
     */
    public static async createConnection() {
        try {
            const host = process.env.MYSQL_HOST;
            if (!Helpers.isNotBlank(host)) return null;

            const port = Number(process.env.MYSQL_PORT);
            if (!port) return null;

            const username = process.env.MYSQL_USERNAME;
            if (!Helpers.isNotBlank(username)) return null;

            const password = process.env.MYSQL_PASSWORD;

            const database = process.env.MYSQL_DATABASE;
            if (!Helpers.isNotBlank(database)) return null;

            this._connection = await createConnection({
                type: 'mysql',
                host,
                port,
                username,
                password,
                database,
                entities: [UserEntity],
            });
            return this._connection;
        } catch (e) {
            return null;
        }
    }

    /**
     * Get MySQL entity manager
     * @returns MySQL entity manager
     */
    public static getManager() {
        return this._connection.manager;
    }
}
