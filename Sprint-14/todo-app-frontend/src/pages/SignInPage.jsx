import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Alert, Card } from '../components/common';
import { signInSchema } from '../validations/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import authService from '../services/authService';

const SignInPage = () => {
    const [apiError, setApiError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    // Form submission handler
    const submitHandler = async (data) => {
        try {
            setApiError(null);

            await authService.signin(data);
        } catch (error) {
            setApiError(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <section className="min-h-screen flex item-center justify-center bg-gray-50 py-12 px-4">
            <div className=" max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bod text-gray-900">
                        Welcome Back
                    </h1>
                </div>
                <p className="text-center text-gray-600 mb-6 mt-2">
                    Sign in to your Account
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isSubmitting}
                        className="mt-6"
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                    
                </form>
            </Card>
        </section>
    )
}

export default SignInPage;

