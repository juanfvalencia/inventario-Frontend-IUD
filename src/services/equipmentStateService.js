import { axiosInstance } from "../helpers/axios-config";

const getEquipmentStates = () => {
    return axiosInstance.get('equipment-state', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getEquipmentStateById = (equipmentStateId) =>{
    return axiosInstance.get(`equipment-state/${equipmentStateId}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

const createEquipmentState = (data) => {
    return axiosInstance.post('equipment-state', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateEquipmentState = (equipmentStateId, data) =>{
    return axiosInstance.put(`equipment-state/${equipmentStateId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getEquipmentStates,
    getEquipmentStateById,
    createEquipmentState,
    updateEquipmentState
}