import * as z from 'zod';

/**
 * Sign Up Schema
 * Validates:
 * - username: String and is Required, validate that is no more than 50 characters long
 * - email: String, is Required, and must be a valid email format
 * - password: String, is Required, and must be at least 8 characters long
 */
export const signUpSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(50, 'Username must be no more than 50 characters long')
        .trim(),
    
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number"
        )
});

/**
 * Sign In Schema
 * Validates:
 * - email: String, is Required, and must be a valid email format
 * - password: String, is Required
 */

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, 'Password is required')
})

