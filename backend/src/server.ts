import { buildApp } from './app';
import { PORT } from './config';

const startServer = async () => {

    const app = buildApp();

    try {
        await app.listen({ port: PORT, host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();