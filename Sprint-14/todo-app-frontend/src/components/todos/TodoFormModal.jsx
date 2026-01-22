import { useState, useEffect } from 'react';
import { createTodoSchema, updateTodoSchema } from '../../validations';
import { Modal, Input, Button, Alert } from '../common';
import todoService from '../../services/todoService';

const TodoFormModal = ({ 
    isOpen, 
    onClose, 
    listId, 
    todo = null,  // If provided, we're editing
    onSuccess 
}) => {
    const isEditing = Boolean(todo);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Initialize form when todo prop changes
    useEffect(() => {
        if (todo) {
            setFormData({
                title: todo.title || '',
                description: todo.description || '',
            });
        } else {
            setFormData({ title: '', description: '' });
        }
    }, [todo]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    const validateForm = () => {
        // Use different schema based on create/edit mode
        const schema = isEditing ? updateTodoSchema : createTodoSchema;
        const result = schema.safeParse(formData);
        
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
            
            let response;
            if (isEditing) {
                response = await todoService.updateTodo(listId, todo._id, validData);
            } else {
                response = await todoService.createTodo(listId, validData);
            }
            
            // Reset only for create mode
            if (!isEditing) {
                setFormData({ title: '', description: '' });
            }
            
            onSuccess?.(response.data, isEditing ? 'update' : 'create');
            onClose();
        } catch (error) {
            setApiError(error.error || `Failed to ${isEditing ? 'update' : 'create'} todo`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleClose = () => {
        setErrors({});
        setApiError(null);
        if (!isEditing) {
            setFormData({ title: '', description: '' });
        }
        onClose();
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditing ? 'Edit Todo' : 'Add New Todo'}
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
                        {isEditing ? 'Save Changes' : 'Add Todo'}
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
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="What needs to be done?"
                    required
                    error={errors.title}
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
                        placeholder="Add more details..."
                        rows={3}
                        className={`input resize-none ${errors.description ? 'input-error' : ''}`}
                    />
                    {errors.description && (
                        <p className="error-message">{errors.description}</p>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default TodoFormModal;