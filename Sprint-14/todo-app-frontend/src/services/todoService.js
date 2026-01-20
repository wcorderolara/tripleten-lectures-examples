import fetchApi from '../utils/fetchApi.js';
import { ENDPOINTS } from '../utils/constants.js';

const todoService = {
    getTodosByList: async (listId) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchApi.get(ENDPOINTS.TODOS_BY_LIST(listId));
            return response;
        } catch (error) {
            throw error;
        }
    },
    createTodo: async (listId, todoData) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchApi.post(ENDPOINTS.TODOS_BY_LIST(listId), todoData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getTodoById: async (listId, todoId) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchApi.get(ENDPOINTS.TODO_BY_ID(listId, todoId));
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateTodo: async (listId, todoId, todoData) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchApi.put(ENDPOINTS.TODO_BY_ID(listId, todoId), todoData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteTodo: async (listId, todoId) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchApi.delete(ENDPOINTS.TODO_BY_ID(listId, todoId));
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default todoService;
