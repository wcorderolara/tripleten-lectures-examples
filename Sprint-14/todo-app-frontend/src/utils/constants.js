// API URL
export const API_URL = 'http://localhost:4002/api'
export const APP_NAME = 'Todo App - Fullstack'

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'todo_access_token',
    USER: 'todo_user'
}

export const ENDPOINTS = {
    // Auth --- AxiosClient
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    // LISTS --- AxiosClient
    LISTS: '/lists',
    LIST_BY_ID: (listId) => `/lists/${listId}`,
    // TODOS OR TASKS --- Fetch API
    TODOS_BY_LIST: (listId) => `/lists/${listId}/todos`,
    TODO_BY_ID: (listId, todoId) => `/lists/${listId}/todos/${todoId}`,
}

/*
   ENDPOINTS.LIST_BY_ID(123) ---> /lists/123
*/

// HTTP STATUS CODES
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

// TIMEOUT DURATION
export const TIMEOUT = {
    DEFAULT: 10000,
    UPLOAD: 60000
}
