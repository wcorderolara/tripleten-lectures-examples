import { useState, useEffect } from 'react';
import { updateListSchema } from '../../validations';
import { Modal, Input, Button, Alert } from '../common';
import listService from '../../services/listService';

const EditListModal = ({ isOpen, onClose, list, onSuccess }) => {
    // Form state - initialized from props
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isPublic: true,
    });
    
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Update form when list prop changes
    useEffect(() => {
        if (list) {
            setFormData({
                name: list.name || '',
                description: list.description || '',
                isPublic: list.isPublic ?? true,
            });
        }
    }, [list]);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    const validateForm = () => {
        const result = updateListSchema.safeParse(formData);
        
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return null;
        }
        
        setErrors({});
        return result.data;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);
        
        const validData = validateForm();
        if (!validData) return;
        
        try {
            setIsSubmitting(true);
            const response = await listService.updateList(list._id, validData);
            
            onSuccess?.(response);
            onClose();
        } catch (error) {
            setApiError(error.error || 'Failed to update list');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleClose = () => {
        setErrors({});
        setApiError(null);
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Edit List"
            footer={
                <>
                    <Button 
                        variant="secondary" 
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                    >
                        Save Changes
                    </Button>
                </>
            }
        >
            {apiError && (
                <Alert 
                    type="error" 
                    message={apiError} 
                    className="mb-4"
                    dismissible
                    onDismiss={() => setApiError(null)}
                />
            )}
            
            <form onSubmit={handleSubmit} noValidate>
                <Input
                    label="List Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Work Tasks"
                    required
                    error={errors.name}
                />
                
                <div className="mb-4">
                    <label className="label">
                        Description
                        <span className="text-gray-400 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What's this list for?"
                        rows={3}
                        className={`input resize-none ${errors.description ? 'input-error' : ''}`}
                    />
                    {errors.description && (
                        <p className="error-message">{errors.description}</p>
                    )}
                </div>
                
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="editIsPublic"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 
                                   focus:ring-primary-500"
                    />
                    <label htmlFor="editIsPublic" className="ml-2 text-sm text-gray-700">
                        Make this list public
                    </label>
                </div>
            </form>
        </Modal>
    );
};

export default EditListModal;