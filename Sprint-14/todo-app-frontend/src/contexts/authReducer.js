import {AUTH_ACTIONS} from './authTypes';

export const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
}

export const authReducer = (state, action) => {
    switch(action.type) {
         // Initialization - checking stored auth
        case AUTH_ACTIONS.INIT_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        
        case AUTH_ACTIONS.INIT_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        
        case AUTH_ACTIONS.INIT_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,  // Don't show error on init failure
            };
        // Login
        case AUTH_ACTIONS.LOGIN_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            }
        case AUTH_ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload.error
            }
         // Signup
        case AUTH_ACTIONS.SIGNUP_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        
        case AUTH_ACTIONS.SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        
        case AUTH_ACTIONS.SIGNUP_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload.error,
            };
        
        // Logout
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        
        // Profile update
        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload.user },
            };
        
        // Clear error
        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        
        default:
            console.warn(`Unknown action type: ${action.type}`);
            return state;
    }
}