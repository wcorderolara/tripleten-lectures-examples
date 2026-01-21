import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Alert, Card } from '../components/common';
import { signUpSchema } from '../validations/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import authService from '../services/authService';

const SignUpPage = () => {
    const [apiError, setApiError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    // Form submission handler
    const submitHandler = async (data) => {
        try {
            setApiError(null);
            // we need remove confirmPassword before sending data to the backend
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...userData } = data;

            // Execute signup API CALL
            await authService.signup(userData);
        } catch (error) {
            setApiError(error.message || 'An unexpected error occurred');
        }
    }

    return (
        <section className="min-h-screen flex item-center justify-center bg-gray-50 py-12 px-4">
            <div className=" max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bod text-gray-900">
                        Create your Account
                    </h1>
                </div>
                <p className="text-center text-gray-600 mb-6 mt-2">
                    Start organizing your task today
                </p>
            </div>

            <Card>
                {/* Error Alert */}
                {apiError && (
                    <Alert
                        type="error"
                        message={apiError}
                        dismissible
                        onDismiss={() => setApiError(null)}
                    />
                )}

                {/* FORM to submit the signup data */}
                <form onSubmit={handleSubmit(submitHandler)} noValidate>
                    {/* Username Field */}
                    <Input
                        label="Username"
                        type="text"
                        placeholder="john_doe"
                        required
                        error={errors.username?.message}
                        {...register('username')}
                    />
                    {/* Email Field */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        error={errors.email?.message}
                        {...register('email')}
                    />
                    {/* Password Field */}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        required
                        error={errors.password?.message}
                        hint="At least 8 characters with Uppercase, lowercase and numbers"
                        {...register('password')}
                    />
                    {/* Confirm Password Field */}
                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="********"
                        required
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isSubmitting}
                        className="mt-6"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    
                </form>
            </Card>
        </section>
    )
}

export default SignUpPage;

