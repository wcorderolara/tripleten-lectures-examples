import { forwardRef } from 'react';

const Button = forwardRef(({
    variant = 'primary',
    size = 'md',
    isLoading= false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    type = 'button',
    ...props
}, ref) => {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        ghost: 'btn-ghost',
        outline: 'btn-outline',
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={`
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `.trim()}
            {...props}
        >
            {isLoading && (
                <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" cy="12" r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}

            {!isLoading && leftIcon && (
                <span className='mr-2'>{leftIcon}</span>
            )}
            {children}
            
            {!isLoading && rightIcon && (
                <span className='ml-2'>{rightIcon}</span>
            )}
        </button>
    )
});

Button.displayName = 'Button';

export default Button;
