import { API_URL, TIMEOUT } from '../utils/constants.js';
import { getAccessToken } from '../utils/storage.js';

/**
 * Custom error class for HTTP errors
 */
class HTTPError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Creates an AbortController with timeout
 * @param {number} timeout - Timeout in milliseconds
 * @returns {AbortController}
 */
const createTimeoutController = (timeout) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
};

/**
 * Base fetch function with authentication and error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - Parsed JSON response
 */
const fetchClient = async (endpoint, options = {}) => {
    const token = getAccessToken();
    const controller = createTimeoutController(options.timeout || TIMEOUT.DEFAULT);

    // Build headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Build final config
    const config = {
        ...options,
        headers,
        signal: controller.signal,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);

        // Parse JSON response
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Handle HTTP errors
        if (!response.ok) {
            throw new HTTPError(
                data.message || `HTTP Error: ${response.status}`,
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        // Handle abort/timeout errors
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }

        // Handle network errors
        if (error instanceof TypeError) {
            throw new Error('Network error: Please check your connection');
        }

        // Re-throw HTTP errors
        if (error instanceof HTTPError) {
            throw error.data;
        }

        // Re-throw other errors
        throw error;
    }
};

/**
 * HTTP helper methods
 */
export const fetchApi = {
    /**
     * GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Additional fetch options
     * @returns {Promise}
     */
    get: (endpoint, options = {}) => {
        return fetchClient(endpoint, {
            ...options,
            method: 'GET',
        });
    },

    /**
     * POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @param {Object} options - Additional fetch options
     * @returns {Promise}
     */
    post: (endpoint, data, options = {}) => {
        return fetchClient(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @param {Object} options - Additional fetch options
     * @returns {Promise}
     */
    put: (endpoint, data, options = {}) => {
        return fetchClient(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * PATCH request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @param {Object} options - Additional fetch options
     * @returns {Promise}
     */
    patch: (endpoint, data, options = {}) => {
        return fetchClient(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    /**
     * DELETE request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Additional fetch options
     * @returns {Promise}
     */
    delete: (endpoint, options = {}) => {
        return fetchClient(endpoint, {
            ...options,
            method: 'DELETE',
        });
    },
};

export default fetchApi;
