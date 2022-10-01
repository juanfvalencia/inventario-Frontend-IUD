import { axiosInstance } from "../helpers/axios-config";

const getMarks = () => {
    return axiosInstance.get('mark', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getMarkById = (markId) => {
    return axiosInstance.get(`mark/${markId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const createMark = (data) => {
    return axiosInstance.post('mark', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateMark = (markId, data) => {
    return axiosInstance.put(`mark/${markId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getMarks,
    getMarkById,
    createMark,
    updateMark
}