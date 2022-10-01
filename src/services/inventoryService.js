import { axiosInstance } from "../helpers/axios-config";

const getInventories = () => {
    return axiosInstance.get('inventory', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getInventoryById = (inventoryId) => {
    return axiosInstance.get(`inventory/${inventoryId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createInventory = (data) => {
    return axiosInstance.post('inventory', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateInventory = (inventoryId, data) => {
    return axiosInstance.put(`inventory/${inventoryId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getInventories,
    getInventoryById,
    createInventory,
    updateInventory
}