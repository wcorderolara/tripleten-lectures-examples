import { z } from 'zod';

/**
 * Create Todo Schema
 * 
 * Validates:
 * - title: 3-100 characters (required)
 * - description: 0-500 characters (optional)
 */
export const createTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters')
        .trim(),
    
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional()
        .default(''),
});

/**
 * Update Todo Schema
 * 
 * Validates:
 * - title: 3-100 characters (optional)
 * - description: 0-500 characters (optional)
 * - completed: boolean (optional)
 */
export const updateTodoSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters')
        .trim()
        .optional(),
    
    description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .trim()
        .optional(),
    
    completed: z
        .boolean()
        .optional(),
});

/**
 * Toggle Todo Schema
 * 
 * For simple completion toggle
 */
export const toggleTodoSchema = z.object({
    completed: z.boolean(),
});