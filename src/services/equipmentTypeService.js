import { axiosInstance } from "../helpers/axios-config";

const getEquipmentTypes = () => {
    return axiosInstance.get('equipment-type', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getEquipmentTypeById = (equipmentTypeId) =>{
    return axiosInstance.get(`equipment-type/${equipmentTypeId}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

const createEquipmentType = (data) => {
    return axiosInstance.post('equipment-type', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const updateEquipmentType = (equipmentTypeId, data) =>{
    return axiosInstance.put(`equipment-type/${equipmentTypeId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getEquipmentTypes,
    getEquipmentTypeById,
    createEquipmentType,
    updateEquipmentType
}