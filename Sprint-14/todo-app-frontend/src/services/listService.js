import axiosClient from './axiosApi.js';
import { ENDPOINTS } from '../utils/constants.js';

// List Service: Handles operations related to lists
const listService = {

    getMyLists: async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(ENDPOINTS.LISTS);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getListById: async (listId) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.get(ENDPOINTS.LIST_BY_ID(listId));
            return response;
        } catch (error) {
            throw error;
        }
    },
    createList: async (listData) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.post(ENDPOINTS.LISTS, listData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateList: async (listId, listData) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.put(ENDPOINTS.LIST_BY_ID(listId), listData);
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteList: async (listId) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axiosClient.delete(ENDPOINTS.LIST_BY_ID(listId));
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default listService;
