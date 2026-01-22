import { useForm } from 'react-hook-form';
import { Button, Input, Alert, Card } from '../components/common';
import { signInSchema } from '../validations/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const SignInPage = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    // Form submission handler
    const submitHandler = async (data) => {
        clearError();
        const result = await login(data);
        if(result.success) {
            navigate('/dashboard');
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
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        dismissible
                        onDismiss={clearError}
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
                        isLoading={isLoading}
                        className="mt-6"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    
                </form>
            </Card>
        </section>
    )
}

export default SignInPage;

