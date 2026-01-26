import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, Button, Alert, Spinner, ConfirmModal } from '../components/common';
import { EditListModal } from '../components/lists';
import { TodoFormModal } from '../components/todos';
import listService from '../services/listService';
import todoService from '../services/todoService';

const ListDetailPage = () => {
    const { listId } = useParams();
    const navigate = useNavigate();
    
    // Data state
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal states
    const [showEditListModal, setShowEditListModal] = useState(false);
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [showDeleteListModal, setShowDeleteListModal] = useState(false);
    const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Fetch list and todos
    const fetchListData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await listService.getListById(listId);
            setList(response.data);
            setTodos(response.data.todos || []);
        } catch (err) {
            if (err.error === 'List not found') {
                navigate('/dashboard');
            }
            setError(err.error || 'Failed to load list');
        } finally {
            setIsLoading(false);
        }
    }, [listId, navigate]);
    
    useEffect(() => {
        fetchListData();
    }, [fetchListData]);
    
    // Handle todo toggle
    const handleToggleTodo = async (todo) => {
        try {
            const response = await todoService.toggleTodo(
                listId, 
                todo._id, 
                !todo.completed
            );
            setTodos(prev => 
                prev.map(t => t._id === todo._id ? response.data : t)
            );
        } catch (err) {
            setError(err.error || 'Failed to update todo');
        }
    };
    
    // Handle list edit success
    const handleListEditSuccess = (updatedList) => {
        setList(updatedList);
        setShowEditListModal(false);
    };
    
    // Handle list delete
    const handleDeleteList = async () => {
        try {
            setIsDeleting(true);
            await listService.deleteList(listId);
            navigate('/dashboard');
        } catch (err) {
            setError(err.error || 'Failed to delete list');
            setIsDeleting(false);
        }
    };
    
    // Handle todo create/edit success
    const handleTodoSuccess = (todo, action) => {
        if (action === 'create') {
            setTodos(prev => [...prev, todo]);
        } else {
            setTodos(prev => prev.map(t => t._id === todo._id ? todo : t));
        }
        setShowTodoModal(false);
        setSelectedTodo(null);
    };
    
    // Handle todo edit click
    const handleEditTodo = (todo) => {
        setSelectedTodo(todo);
        setShowTodoModal(true);
    };
    
    // Handle todo delete
    const handleDeleteTodo = async () => {
        if (!selectedTodo) return;
        
        try {
            setIsDeleting(true);
            await todoService.deleteTodo(listId, selectedTodo._id);
            setTodos(prev => prev.filter(t => t._id !== selectedTodo._id));
            setShowDeleteTodoModal(false);
            setSelectedTodo(null);
        } catch (err) {
            setError(err.error || 'Failed to delete todo');
        } finally {
            setIsDeleting(false);
        }
    };
    
    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }
    
    // Not found state
    if (!list) {
        return (
            <Card className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    List not found
                </h2>
                <p className="text-gray-600 mb-4">
                    This list may have been deleted or doesn't exist.
                </p>
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </Card>
        );
    }
    
    // Calculate stats
    const completedCount = todos.filter(t => t.completed).length;
    const totalCount = todos.length;
    
    return (
        <div>
            {/* Back Button */}
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4 
                           transition-colors"
            >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
            </button>
            
            {/* List Header */}
            <Card className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {list.name}
                            </h1>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                list.isPublic 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {list.isPublic ? 'Public' : 'Private'}
                            </span>
                        </div>
                        {list.description && (
                            <p className="text-gray-600 mt-2">{list.description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                            {completedCount} of {totalCount} completed
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setShowEditListModal(true)}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => setShowDeleteListModal(true)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                
                {/* Progress Bar */}
                {totalCount > 0 && (
                    <div className="mt-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary-600 transition-all duration-300"
                                style={{ width: `${(completedCount / totalCount) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </Card>
            
            {/* Error Alert */}
            {error && (
                <Alert 
                    type="error" 
                    message={error} 
                    className="mb-6"
                    dismissible
                    onDismiss={() => setError(null)}
                />
            )}
            
            {/* Add Todo Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Todos</h2>
                <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                        setSelectedTodo(null);
                        setShowTodoModal(true);
                    }}
                >
                    + Add Todo
                </Button>
            </div>
            
            {/* Todos List */}
            {todos.length === 0 ? (
                <Card className="text-center py-8">
                    <p className="text-gray-600 mb-4">No todos yet</p>
                    <Button 
                        variant="primary"
                        onClick={() => {
                            setSelectedTodo(null);
                            setShowTodoModal(true);
                        }}
                    >
                        Add Your First Todo
                    </Button>
                </Card>
            ) : (
                <div className="space-y-3">
                    {todos.map(todo => (
                        <Card key={todo._id} className="flex items-center p-4">
                            {/* Checkbox */}
                            <button
                                onClick={() => handleToggleTodo(todo)}
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 
                                           mr-4 flex items-center justify-center transition-colors
                                           ${todo.completed 
                                               ? 'bg-primary-600 border-primary-600' 
                                               : 'border-gray-300 hover:border-primary-500'
                                           }`}
                            >
                                {todo.completed && (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            
                            {/* Todo Content */}
                            <div className="flex-grow min-w-0">
                                <h3 className={`font-medium ${
                                    todo.completed 
                                        ? 'text-gray-400 line-through' 
                                        : 'text-gray-900'
                                }`}>
                                    {todo.title}
                                </h3>
                                {todo.description && (
                                    <p className={`text-sm truncate ${
                                        todo.completed ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {todo.description}
                                    </p>
                                )}
                            </div>
                            
                            {/* Actions */}
                            <div className="flex space-x-2 ml-4">
                                <button
                                    onClick={() => handleEditTodo(todo)}
                                    className="p-1 text-gray-400 hover:text-primary-600 
                                               rounded transition-colors"
                                    title="Edit"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedTodo(todo);
                                        setShowDeleteTodoModal(true);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 
                                               rounded transition-colors"
                                    title="Delete"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            
            {/* Edit List Modal */}
            <EditListModal
                isOpen={showEditListModal}
                onClose={() => setShowEditListModal(false)}
                list={list}
                onSuccess={handleListEditSuccess}
            />
            
            {/* Todo Form Modal */}
            <TodoFormModal
                isOpen={showTodoModal}
                onClose={() => {
                    setShowTodoModal(false);
                    setSelectedTodo(null);
                }}
                listId={listId}
                todo={selectedTodo}
                onSuccess={handleTodoSuccess}
            />
            
            {/* Delete List Confirmation */}
            <ConfirmModal
                isOpen={showDeleteListModal}
                onClose={() => setShowDeleteListModal(false)}
                onConfirm={handleDeleteList}
                title="Delete List"
                message={`Are you sure you want to delete "${list?.name}"? All todos will be permanently removed.`}
                confirmText="Delete List"
                isLoading={isDeleting}
            />
            
            {/* Delete Todo Confirmation */}
            <ConfirmModal
                isOpen={showDeleteTodoModal}
                onClose={() => {
                    setShowDeleteTodoModal(false);
                    setSelectedTodo(null);
                }}
                onConfirm={handleDeleteTodo}
                title="Delete Todo"
                message={`Are you sure you want to delete "${selectedTodo?.title}"?`}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default ListDetailPage;