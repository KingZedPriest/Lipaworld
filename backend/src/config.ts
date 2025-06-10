import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a schema for environment variables
const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DEBUG_MODE: z.string().optional().default('false'),
});

// Validate the environment variables
const parsedEnv = envSchema.parse(process.env);

// Export validated variables
export const { PORT, DEBUG_MODE } = parsedEnv;