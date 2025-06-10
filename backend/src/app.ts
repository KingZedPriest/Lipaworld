import Fastify, { FastifyInstance, FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import fastifyCors from '@fastify/cors';

//Schemas
import { generalSchema } from './schemas/general.schema';

//Utils
import { sendResponse } from './utils/response.utils';
import { setupSwagger } from './utils/swagger';

export const app: FastifyInstance = Fastify({ logger: { level: 'info' }, trustProxy: 3 });

// Build the Fastify app
export const buildApp = (): FastifyInstance => {

    //For the documentation
    setupSwagger(app);

    //Register Cors
    app.register(fastifyCors, {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    })

    // Register routes and schemas
    for (const schema of [
        ...generalSchema,
    ]) { app.addSchema(schema) }

    // app.register(userRoutes, { prefix: '/v1/api/users' });

    // Health Check Endpoint
    app.get('/healthcheck', async () => {
        return { status: 'OK' };
    });

    // Global error handler
    app.setErrorHandler((error: FastifyError, request, reply) => {
        // Generic fallback
        request.log.error(error);
        return sendResponse(reply, 500, false, error.message);
    });

    return app;
}