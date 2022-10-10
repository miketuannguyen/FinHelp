import app from './app';
import * as dotenv from 'dotenv';
import { AppLogger } from './utils';
import { MySQLDatabase } from './database';
import { initMapper } from './dtos';

dotenv.config();

const PORT = Number(process.env.PORT);
if (!PORT) {
    AppLogger.error('process.env.PORT is unassigned.');
    process.exit(1);
}

app.listen(PORT, () => {
    void MySQLDatabase.initDataSource()
        .then((dataSource) => {
            if (!dataSource) {
                AppLogger.info('MySQL database initialization failed.');
                process.exit(1);
            }

            AppLogger.initAppLogFolder();

            initMapper();

            const ENVIRONMENT = process.env.ENVIRONMENT;
            if (ENVIRONMENT === 'DEV') {
                const cyan = '\x1b[36m%s\x1b[0m';
                AppLogger.info(cyan, `========== PassSword API is running on port ${PORT} ==========`);
                return;
            }

            if (ENVIRONMENT === 'PROD') {
                AppLogger.info('PassSword API starts.');
                return;
            }

            AppLogger.error('process.env.ENVIRONMENT is incorrect.');
            process.exit(1);
        })
        .catch((e) => {
            AppLogger.error('Database initialization failed.', e);
        });
});
