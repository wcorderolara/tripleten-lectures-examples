import { z } from 'zod';

/**
 * Update Profile Schema
 * 
 * Validates:
 * - username: 3-50 characters
 */
export const updateProfileSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be less than 50 characters')
        .trim(),
});

/**
 * Change Password Schema
 * 
 * Validates:
 * - currentPassword: not empty
 * - newPassword: 8+ characters with complexity
 * - confirmNewPassword: must match newPassword
 */
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, 'Current password is required'),
    
    newPassword: z
        .string()
        .min(1, 'New password is required')
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    
    confirmNewPassword: z
        .string()
        .min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
});