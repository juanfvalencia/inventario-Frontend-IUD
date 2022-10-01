import { axiosInstance } from "../helpers/axios-config";

const getUsers = () => {
    return axiosInstance.get('user', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getUserById = (userId) => {
    return axiosInstance.get(`user/${userId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const createUser = (data) => {
    return axiosInstance.post('user', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateUser = (userId, data) => {
    return axiosInstance.put(`user/${userId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser
}