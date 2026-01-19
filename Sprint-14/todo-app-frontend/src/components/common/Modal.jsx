import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal Component
 * 
 * A dialog overlay that uses React Portal for proper stacking.
 * 
 * Features:
 * - Closes on Escape key
 * - Closes on backdrop click
 * - Prevents body scroll when open
 * - Accessible with proper ARIA attributes
 */
const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    size = 'md',
    children, 
    footer 
}) => {
    // Handle escape key and body scroll
    useEffect(() => {
        if (isOpen) {
            const handleEscape = (e) => {
                if (e.key === 'Escape') onClose();
            };
            
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;
    
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };
    
    return createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal container */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div 
                    className={`relative bg-white rounded-xl shadow-xl w-full ${sizes[size]}`}
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Header */}
                    {title && (
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button 
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    {/* Content */}
                    <div className="px-6 py-4">
                        {children}
                    </div>
                    
                    {/* Footer */}
                    {footer && (
                        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;