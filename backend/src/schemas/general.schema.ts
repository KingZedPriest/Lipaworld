import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Reusable base with optional overrides
export const responseCore = ({ status, success }: { status?: number; success?: boolean } = {}) => z.object({
    status: status !== undefined ? z.literal(status) : z.number(),
    success: success !== undefined ? z.literal(success) : z.boolean(),
    message: z.string(),
});

export const responseSchema = responseCore({ status: 200, success: true });
export const badRequestSchema = responseCore({ status: 400, success: false });
export const conflictRequestSchema = responseCore({ status: 409, success: false });
export const unauthorizedSchema = responseCore({ status: 401, success: false });
export const forbiddenSchema = responseCore({ status: 403, success: false });
export const unAvailableSchema = responseCore({ status: 404, success: false });


export const { schemas: generalSchema, $ref: generalRef } = buildJsonSchemas({ responseSchema, badRequestSchema, conflictRequestSchema, unauthorizedSchema, forbiddenSchema,  unAvailableSchema }, { $id: 'ResponseSchema' })