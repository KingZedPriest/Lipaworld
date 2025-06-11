import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a schema for environment variables
const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DEBUG_MODE: z.string().optional().default('false'),
    AWS_REGION: z.string(),
    AWS_DYNAMO_TABLE_NAME: z.string(),
    AWS_SQS_QUEUE_URL: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string()
});

// Validate the environment variables
const parsedEnv = envSchema.parse(process.env);

// Export validated variables
export const { PORT, DEBUG_MODE, AWS_REGION, AWS_DYNAMO_TABLE_NAME, AWS_SQS_QUEUE_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = parsedEnv;