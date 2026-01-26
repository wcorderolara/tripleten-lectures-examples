// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Card, CardHeader, CardTitle, Button, Input, Alert, Modal } from '../components/common';
// import { updateProfileSchema, changePasswordSchema } from '../validations';
// import { useAuth } from '../hooks';
// import userService from '../services/userService';

// const ProfilePage = () => {
//     const { user, updateUser } = useAuth();
    
//     // Profile form state
//     const [profileError, setProfileError] = useState(null);
//     const [profileSuccess, setProfileSuccess] = useState(null);
    
//     // Password modal state
//     const [showPasswordModal, setShowPasswordModal] = useState(false);
//     const [passwordError, setPasswordError] = useState(null);
//     const [passwordSuccess, setPasswordSuccess] = useState(null);
    
//     // Profile form (React Hook Form)
//     const {
//         register: registerProfile,
//         handleSubmit: handleProfileSubmit,
//         formState: { errors: profileErrors, isSubmitting: isProfileSubmitting }
//     } = useForm({
//         resolver: zodResolver(updateProfileSchema),
//         defaultValues: {
//             username: user?.username || '',
//         }
//     });
    
//     // Password form (React Hook Form)
//     const {
//         register: registerPassword,
//         handleSubmit: handlePasswordSubmit,
//         reset: resetPasswordForm,
//         formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting }
//     } = useForm({
//         resolver: zodResolver(changePasswordSchema),
//         defaultValues: {
//             currentPassword: '',
//             newPassword: '',
//             confirmNewPassword: '',
//         }
//     });
    
//     // Handle profile update
//     const onProfileSubmit = async (data) => {
//         try {
//             setProfileError(null);
//             setProfileSuccess(null);
            
//             const response = await userService.updateProfile(user.id, data);
//             updateUser(response.data);
            
//             setProfileSuccess('Profile updated successfully!');
//         } catch (error) {
//             setProfileError(error.error || 'Failed to update profile');
//         }
//     };
    
//     // Handle password change
//     const onPasswordSubmit = async (data) => {
//         try {
//             setPasswordError(null);
//             setPasswordSuccess(null);
            
//             await userService.changePassword(user.id, {
//                 currentPassword: data.currentPassword,
//                 newPassword: data.newPassword,
//             });
            
//             setPasswordSuccess('Password changed successfully!');
//             resetPasswordForm();
            
//             // Close modal after short delay
//             setTimeout(() => {
//                 setShowPasswordModal(false);
//                 setPasswordSuccess(null);
//             }, 1500);
//         } catch (error) {
//             setPasswordError(error.error || 'Failed to change password');
//         }
//     };
    
//     // Handle password modal close
//     const handlePasswordModalClose = () => {
//         setShowPasswordModal(false);
//         setPasswordError(null);
//         setPasswordSuccess(null);
//         resetPasswordForm();
//     };
    
//     return (
//         <div className="max-w-2xl mx-auto">
//             <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>
            
//             {/* Profile Information Card */}
//             <Card className="mb-6">
//                 <CardHeader>
//                     <CardTitle>Profile Information</CardTitle>
//                 </CardHeader>
                
//                 {profileSuccess && (
//                     <Alert 
//                         type="success" 
//                         message={profileSuccess} 
//                         className="mb-4"
//                         dismissible
//                         onDismiss={() => setProfileSuccess(null)}
//                     />
//                 )}
                
//                 {profileError && (
//                     <Alert 
//                         type="error" 
//                         message={profileError} 
//                         className="mb-4"
//                         dismissible
//                         onDismiss={() => setProfileError(null)}
//                     />
//                 )}
                
//                 <form onSubmit={handleProfileSubmit(onProfileSubmit)} noValidate>
//                     <Input
//                         label="Username"
//                         {...registerProfile('username')}
//                         error={profileErrors.username?.message}
//                         required
//                     />
                    
//                     <div className="mb-4">
//                         <label className="label">Email</label>
//                         <input
//                             type="email"
//                             value={user?.email || ''}
//                             disabled
//                             className="input bg-gray-100"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                             Email cannot be changed
//                         </p>
//                     </div>
                    
//                     <Button
//                         type="submit"
//                         variant="primary"
//                         isLoading={isProfileSubmitting}
//                     >
//                         Save Changes
//                     </Button>
//                 </form>
//             </Card>
            
//             {/* Security Card */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Security</CardTitle>
//                 </CardHeader>
                
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="font-medium text-gray-900">Password</p>
//                         <p className="text-sm text-gray-600">
//                             Change your account password
//                         </p>
//                     </div>
//                     <Button
//                         variant="outline"
//                         onClick={() => setShowPasswordModal(true)}
//                     >
//                         Change Password
//                     </Button>
//                 </div>
//             </Card>
            
//             {/* Account Info Card */}
//             <Card className="mt-6">
//                 <CardHeader>
//                     <CardTitle>Account Information</CardTitle>
//                 </CardHeader>
                
//                 <div className="space-y-3 text-sm">
//                     <div className="flex justify-between">
//                         <span className="text-gray-600">User ID</span>
//                         <span className="font-mono text-gray-900">{user?.id}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-gray-600">Account Created</span>
//                         <span className="text-gray-900">
//                             {user?.createdAt 
//                                 ? new Date(user.createdAt).toLocaleDateString()
//                                 : 'N/A'
//                             }
//                         </span>
//                     </div>
//                 </div>
//             </Card>
            
//             {/* Change Password Modal */}
//             <Modal
//                 isOpen={showPasswordModal}
//                 onClose={handlePasswordModalClose}
//                 title="Change Password"
//                 footer={
//                     <>
//                         <Button
//                             variant="secondary"
//                             onClick={handlePasswordModalClose}
//                             disabled={isPasswordSubmitting}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="primary"
//                             onClick={handlePasswordSubmit(onPasswordSubmit)}
//                             isLoading={isPasswordSubmitting}
//                         >
//                             Change Password
//                         </Button>
//                     </>
//                 }
//             >
//                 {passwordSuccess && (
//                     <Alert 
//                         type="success" 
//                         message={passwordSuccess} 
//                         className="mb-4"
//                     />
//                 )}
                
//                 {passwordError && (
//                     <Alert 
//                         type="error" 
//                         message={passwordError} 
//                         className="mb-4"
//                         dismissible
//                         onDismiss={() => setPasswordError(null)}
//                     />
//                 )}
                
//                 <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} noValidate>
//                     <Input
//                         label="Current Password"
//                         type="password"
//                         {...registerPassword('currentPassword')}
//                         error={passwordErrors.currentPassword?.message}
//                         required
//                     />
                    
//                     <Input
//                         label="New Password"
//                         type="password"
//                         {...registerPassword('newPassword')}
//                         error={passwordErrors.newPassword?.message}
//                         hint="At least 8 characters with uppercase, lowercase, and number"
//                         required
//                     />
                    
//                     <Input
//                         label="Confirm New Password"
//                         type="password"
//                         {...registerPassword('confirmNewPassword')}
//                         error={passwordErrors.confirmNewPassword?.message}
//                         required
//                     />
//                 </form>
//             </Modal>
//         </div>
//     );
// };

const ProfilePage = () => {
    return (
        <div>ProfilePage</div>
    );
}

export default ProfilePage;