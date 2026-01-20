import {STORAGE_KEYS} from './constants';

/**
 * Wraps localStorage with JSON handling and error management.
 */

export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error setting item in localStorage: ${error}`);
        return false;
    }
}

export const getItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting item from localStorage: ${error}`);
        return false;
    }
}

export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing item from localStorage: ${error}`);
        return false;
    }
}

// Helpers: Functions for specific storage keys
export const setAccessToken = (token) => setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
export const getAccessToken = () => getItem(STORAGE_KEYS.ACCESS_TOKEN);
export const removeAccessToken = () => removeItem(STORAGE_KEYS.ACCESS_TOKEN);
export const setUser = (user) => setItem(STORAGE_KEYS.USER, user);
export const getUser = () => getItem(STORAGE_KEYS.USER);           

export const removeUser = () => removeItem(STORAGE_KEYS.USER);