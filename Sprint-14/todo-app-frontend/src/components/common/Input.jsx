import { forwardRef, useState } from 'react';

/**
 * Input Component
 * 
 * A form input that uses our .input and .input-error Tailwind layer classes.
 * 
 * Features:
 * - Label with required indicator
 * - Error message display
 * - Hint text for guidance
 * - Password visibility toggle
 * - Left/right icon support
 * 
 * forwardRef is required for React Hook Form integration,
 * as it needs direct access to the input element.
 */
const Input = forwardRef(({
    label,
    error,
    hint,
    required = false,
    type = 'text',
    leftIcon,
    rightIcon,
    className = '',
    containerClassName = '',
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    
    // Use our layer classes: .input for normal, .input-error for error state
    const inputClass = error ? 'input-error' : 'input';
    
    // Add padding for icons
    const iconPadding = `
        ${leftIcon ? 'pl-10' : ''}
        ${rightIcon || isPassword ? 'pr-10' : ''}
    `.trim();
    
    return (
        <div className={`mb-4 ${containerClassName}`}>
            {/* Label with required indicator */}
            {label && (
                <label className="label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{leftIcon}</span>
                    </div>
                )}
                
                {/* Input field using our layer class */}
                <input
                    ref={ref}
                    type={inputType}
                    className={`${inputClass} ${iconPadding} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    {...props}
                />
                
                {/* Right Icon or Password Toggle */}
                {(rightIcon || isPassword) && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {isPassword ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        ) : (
                            <span className="text-gray-400">{rightIcon}</span>
                        )}
                    </div>
                )}
            </div>
            
            {/* Error message using our layer class */}
            {error && <p className="error-message">{error}</p>}
            
            {/* Hint text */}
            {hint && !error && (
                <p className="text-sm text-gray-500 mt-1">{hint}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

// Simple icon components
const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

export default Input;