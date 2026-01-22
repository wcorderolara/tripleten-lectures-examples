import { createContext, useReducer, useEffect, useCallback } from "react";
import { authReducer, initialState } from "./authReducer";
import { AUTH_ACTIONS } from "./authTypes";
import authService from "../services/authService";
import {
  getAccessToken,
  getUser
} from "../utils/storage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = () => {
      dispatch({ type: AUTH_ACTIONS.INIT_START });

      try {
        const token = getAccessToken();
        const user = getUser();

        if (token && user) {
          dispatch({
            type: AUTH_ACTIONS.INIT_SUCCESS,
            payload: { user, token },
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.INIT_FAILURE });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: AUTH_ACTIONS.INIT_FAILURE });
      }
    };
    initializeAuth();
  }, []);

   // Login function
    const login = useCallback(async (credentials) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN_START });
        
        try {
            const response = await authService.signin(credentials);
            const { user, token } = response.data;
            
            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: { user, token },
            });
            
            return { success: true };
        } catch (error) {
            const errorMessage = error.error || 'Login failed';
            
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: { error: errorMessage },
            });
            
            return { success: false, error: errorMessage };
        }
    }, []);
    
    // Signup function
    const signup = useCallback(async (userData) => {
        dispatch({ type: AUTH_ACTIONS.SIGNUP_START });
        
        try {
            const response = await authService.signup(userData);
            const { user, token } = response.data;
            
            dispatch({
                type: AUTH_ACTIONS.SIGNUP_SUCCESS,
                payload: { user, token },
            });
            
            return { success: true };
        } catch (error) {
            const errorMessage = error.error || 'Signup failed';
            
            dispatch({
                type: AUTH_ACTIONS.SIGNUP_FAILURE,
                payload: { error: errorMessage },
            });
            
            return { success: false, error: errorMessage };
        }
    }, []);
    
    // Logout function
    const logout = useCallback(() => {
        authService.logout();  // Clear localStorage
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }, []);
    
    // Update user profile
    const updateUser = useCallback((userData) => {
        dispatch({
            type: AUTH_ACTIONS.UPDATE_USER,
            payload: { user: userData },
        });
    }, []);
    
    // Clear error
    const clearError = useCallback(() => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    }, []);

    const contextValue = {
        // State
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        // Actions
        login,
        signup,
        logout,
        updateUser,
        clearError,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};
