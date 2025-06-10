import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

export const setupSwagger = async (app: FastifyInstance) => {
    // Register Swagger core first
    await app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Lipaworld API',
                description: 'API documentation for Lipaworld API Endpoints',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server',
                },
            ],
            tags: [
                { name: 'Vouchers', description: 'Voucher-related endpoints' },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
    });

    // Then register the UI plugin
    await app.register(fastifySwaggerUI, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true,
        },
        staticCSP: true,
    });
};
