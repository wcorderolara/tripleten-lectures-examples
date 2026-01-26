import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { PageSpinner } from '../common/Spinner';

/**
 * PrivateRoute Component - Protects routes that require authentication.
 * 
 * usage:
 * <Route patch="/dashboard" element={<PrivateRoute><Dashbaord /></PrivateRoute>}
 *
 */

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checkint auth state
    if(isLoading) {
        return <PageSpinner />;
    }
    // Redirect to login if not authtenticated
    if(!isAuthenticated) {
        return (
            <Navigate 
                to="/login"
                state={{ from: location }}
                replace
            />
        )
    }

    return children;
}

export default PrivateRoute;

