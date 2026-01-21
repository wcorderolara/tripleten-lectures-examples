import { z } from 'zod';

/**
 * Create List Schema
 * 
 * Validates:
 * - name: 1-100 characters (required)
 * - description: 0-500 characters (optional)
 * - isPublic: boolean (defaults to true)
 */
export const createListSchema = z.object({
    name: z
        .string()
        .min(1, 'List name is required')
        .max(100, 'List name must be less than 100 characters')
        .trim(),
    
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional()
        .default(''),
    
    isPublic: z
        .boolean()
        .default(true),
});

/**
 * Update List Schema
 * 
 * Same as create, but all fields are optional
 * Uses .partial() to make all fields optional
 */
export const updateListSchema = z.object({
    name: z
        .string()
        .min(1, 'List name cannot be empty')
        .max(100, 'List name must be less than 100 characters')
        .trim()
        .optional(),
    
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),
    
    isPublic: z
        .boolean()
        .optional(),
});

// Alternative using .partial()
// export const updateListSchema = createListSchema.partial();