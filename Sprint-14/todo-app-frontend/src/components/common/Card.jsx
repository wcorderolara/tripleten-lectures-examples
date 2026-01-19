/**
 * Card Component
 * 
 * Uses our .card and .card-hover Tailwind layer classes
 * for consistent container styling.
 */
const Card = ({
    children,
    hover = false,
    className = '',
    onClick,
    ...props
}) => {
    // Use our layer classes
    const cardClass = hover ? 'card-hover' : 'card';
    const interactiveClass = onClick ? 'cursor-pointer' : '';
    
    return (
        <div 
            className={`${cardClass} ${interactiveClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`-mx-6 -mt-6 px-6 py-4 border-b border-gray-200 mb-4 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {children}
    </h3>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`-mx-6 -mb-6 px-6 py-4 border-t border-gray-200 mt-4 bg-gray-50 rounded-b-xl ${className}`}>
        {children}
    </div>
);

export default Card;