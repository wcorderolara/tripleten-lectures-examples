import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { PageSpinner } from '../common/Spinner';

/**
 * PublicRoute Component - For routes that don't require authentication.
 * 
 * usage:
 * <Route patch="/dashboard" element={<PublicRoute><SignInPage /></PublicRoute>}
 *
 */

const PublicRoute = ({ children, redirectTo }) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    // Show loading spinner while checkint auth state
    if(isLoading) {
        return <PageSpinner />;
    }
    // Redirect to login if not authtenticated
    if(isAuthenticated) {
        return <Navigate to={redirectTo} replace/>
    }

    return children;
}

export default PublicRoute;
