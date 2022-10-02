import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEquipmentTypeById, updateEquipmentType } from '../../services/equipmentTypeService'; 
import Swal from 'sweetalert2';


export const TypeUpdate = () => {
    
    const { equipmentTypeId = '' } = useParams();
    const [ equipmentType, setEquipmentType ] = useState({});
    const [ valuesForm, setValuesForm ] = useState({});
    const { name = '', state = ''} = valuesForm;

    useEffect(() => {
        setValuesForm({
            name: equipmentType.name,
            state: equipmentType.state
        });
      }, [ equipmentType ])
  
    
      useEffect(() => {
        const getEquipmentType = async() => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Cargando...'
                });
                Swal.showLoading()
                const { data } = await getEquipmentTypeById(equipmentTypeId);
                setEquipmentType(data)
                Swal.close()
            } catch (error) {
                console.log(error)
                Swal.close()
            }
        }
        getEquipmentType();
      }, [ equipmentTypeId ]);
  
      const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValuesForm({...valuesForm, [name]: value})
      }
  
      const handleOnSubmit = async(e) => {
        e.preventDefault()
        const equipmentType = {
            name: name, 
            state: state
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading()
            const { data } = await updateEquipmentType(equipmentTypeId, equipmentType);
            Swal.close()
        } catch (error) {
            console.log(error)
            Swal.close()
        }
      }

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-t card-title '> Actualizar Tipo</h5>
            </div>
            <div className='card-body'>
                <div className='row container-g'>
                    <div className='col-md-10'>
                        <form onSubmit={ (e) => handleOnSubmit(e) }>
                            <div className='row '>
                                <div className='col'>
                                    <div className='mb-4'></div>
                                        <label className='form-label label-t'>
                                            <strong>Tipo</strong></label>
                                        <input type="text" className='form-control'
                                               required
                                               name='name'
                                               value={name}
                                               onChange={ (e) => handleOnChange(e)}/>
                                </div>
                                <div className='col'>
                                    <div className='mb-4'></div>
                                        <label className='form-label label-t'>
                                            <strong>Estado</strong></label>
                                        <select className="form-select" 
                                                required
                                                name='state'
                                                value={state}
                                                onChange={ (e) => handleOnChange(e)}>
                                            <option value="" >--SELECCIONE--</option>
                                            <option value="Active" >Activo</option>
                                            <option value="Inactive" >Inactivo</option>
                                        </select>
                                </div>
                            </div>
                            <div className='row '>
                                <div className='col button-sub'>
                                    <button type='submit' className='btn btn-dark'>Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
