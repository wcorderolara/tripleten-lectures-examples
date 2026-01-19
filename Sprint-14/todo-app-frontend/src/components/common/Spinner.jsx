/**
 * Spinner Component
 * 
 * A loading indicator with size variations.
 */
const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };
    
    return (
        <svg 
            className={`animate-spin text-primary-600 ${sizes[size]} ${className}`} 
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
    );
};

/**
 * PageSpinner - Full page loading state
 */
export const PageSpinner = () => (
    <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
    </div>
);

export default Spinner;