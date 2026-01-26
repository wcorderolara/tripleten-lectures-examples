import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Card, Button, Alert, Spinner, ConfirmModal } from '../components/common';
import { CreateListModal, EditListModal } from '../components/lists';
import listService from '../services/listService';

const DashboardPage = () => {
    const navigate = useNavigate();
    
    // Data state
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Fetch lists
    const fetchLists = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await listService.getMyLists();
            setLists(response.data || []);
        } catch (err) {
            setError(err.error || 'Failed to load lists');
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchLists();
    }, [fetchLists]);
    
    // Handle list creation success
    const handleCreateSuccess = (newList) => {
        setLists(prev => [...prev, newList]);
        setShowCreateModal(false);
    };
    
    // Handle edit click
    const handleEditClick = (e, list) => {
        e.stopPropagation();  // Prevent card click
        setSelectedList(list);
        setShowEditModal(true);
    };
    
    // Handle edit success
    const handleEditSuccess = (updatedList) => {
        setLists(prev => 
            prev.map(list => 
                list._id === updatedList._id ? updatedList : list
            )
        );
        setShowEditModal(false);
        setSelectedList(null);
    };
    
    // Handle delete click
    const handleDeleteClick = (e, list) => {
        e.stopPropagation();
        setSelectedList(list);
        setShowDeleteModal(true);
    };
    
    // Handle delete confirm
    const handleDeleteConfirm = async () => {
        if (!selectedList) return;
        
        try {
            setIsDeleting(true);
            await listService.deleteList(selectedList._id);
            setLists(prev => prev.filter(list => list._id !== selectedList._id));
            setShowDeleteModal(false);
            setSelectedList(null);
        } catch (err) {
            setError(err.error || 'Failed to delete list');
        } finally {
            setIsDeleting(false);
        }
    };
    
    // Navigate to list detail
    const handleListClick = (listId) => {
        navigate(`/lists/${listId}`);
    };
    
    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }
    
    return (
        <div>
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Lists</h1>
                    <p className="text-gray-600 mt-1">
                        Organize your tasks into lists
                    </p>
                </div>
                <Button 
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    + New List
                </Button>
            </div>
            
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
            
            {/* Lists Grid */}
            {lists.length === 0 ? (
                <Card className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg 
                            className="mx-auto h-12 w-12" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No lists yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Create your first list to start organizing your tasks.
                    </p>
                    <Button 
                        variant="primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        Create Your First List
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lists.map(list => (
                        <Card 
                            key={list._id}
                            hover
                            onClick={() => handleListClick(list._id)}
                            className="cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
                                    {list.name}
                                </h3>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={(e) => handleEditClick(e, list)}
                                        className="p-1 text-gray-400 hover:text-primary-600 
                                                   rounded transition-colors"
                                        title="Edit list"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteClick(e, list)}
                                        className="p-1 text-gray-400 hover:text-red-600 
                                                   rounded transition-colors"
                                        title="Delete list"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {list.description && (
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {list.description}
                                </p>
                            )}
                            
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    {list.todoCount || 0} todos
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    list.isPublic 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {list.isPublic ? 'Public' : 'Private'}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            
            {/* Create List Modal */}
            <CreateListModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleCreateSuccess}
            />
            
            {/* Edit List Modal */}
            <EditListModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedList(null);
                }}
                list={selectedList}
                onSuccess={handleEditSuccess}
            />
            
            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedList(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete List"
                message={`Are you sure you want to delete "${selectedList?.name}"? All todos in this list will be permanently removed.`}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default DashboardPage;