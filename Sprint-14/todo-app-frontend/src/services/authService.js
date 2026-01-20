import axiosClient from './axiosApi.js';
import { ENDPOINTS } from '../utils/constants.js';
import { setAccessToken, setUser } from '../utils/storage.js';

// Auth Service: Handles user authentication
const authService = {
    /**
     * Register a new user
     */
    signup: async (userData) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(ENDPOINTS.SIGNUP, userData);
            const { token, user } = response;

            setAccessToken(token);
            setUser(user);

            return response;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Login an existing user
     */
    signin: async (credentials) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(ENDPOINTS.SIGNIN, credentials);
            const { token, user } = response;
            setAccessToken(token);
            setUser(user);

            return response;
        } catch (error) {
            throw error;
        }
    },
    /**
    *  Logout the current user
    */
    logout: () => {
        setAccessToken(null);
        setUser(null);
    }
}

export default authService;