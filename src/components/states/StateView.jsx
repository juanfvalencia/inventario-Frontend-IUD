import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getEquipmentStates, createEquipmentState} from '../../services/equipmentStateService';
import Swal from 'sweetalert2';

export const StateView = () => {

  const [ valuesForm, setValuesForm ] = useState({})
  const [ equipmentStates, setEquipmentStates ] = useState([])
  const { name = '', state = ''} = valuesForm;

  
  const ListEquipmentStates = async() =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando..'
      })
      Swal.showLoading()
      const { data } = await getEquipmentStates()
      setEquipmentStates(data)
      Swal.close()
    } catch (error) {
      console.log(error)
      Swal.close()
    }
  }

  useEffect(() => {
    ListEquipmentStates()
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setValuesForm({...valuesForm, [name]: value});
  }

  const handleCreateEquipmentState = async(e) => {
    e.preventDefault()
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      Swal.showLoading()
      const { data } = await createEquipmentState(valuesForm)
      setValuesForm({name: '', state: ''})
      ListEquipmentStates()
      Swal.close()
    } catch (error) {
      console.log(error);
      Swal.close()
    }
  }

  return (
    <div className='container-fluid '>
          <div className='card'>
            <form onSubmit={(e) => handleCreateEquipmentState(e)}>
              <div className='row container-g'>
                <div className="col mb-3">
                  <label className="form-label label-t"><strong>Nombre</strong></label>
                  <input name= 'name' value={name} type="text" className="form-control" 
                    onChange={(e) => handleOnChange(e)}/>
                </div>
                <div className="col mb-3">
                    <label className="form-label label-t"><strong>Estado</strong></label>
                    <select name = 'state' value={state} className="form-select" 
                        onChange={ (e) => handleOnChange(e) }>
                        <option value="" >--SELECCIONE--</option>
                        <option value="Active">Activo</option>
                        <option value="Inactive">Inactivo</option>
                    </select>
                </div>
                <div className='row'>
                    <div className='col button-sub'>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </div>
              </div>
            </form>
            <hr />
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha de creación</th>
                  <th scope="col">Fecha de actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  equipmentStates.length > 0 && equipmentStates.map((equipmentState, index) =>{
                    return <tr key={equipmentState._id}>
                              <td value={equipmentState._id} name={equipmentState._id}>{index + 1}</td>
                              <td>{equipmentState.name}</td>
                              <td>{equipmentState.state}</td>
                              <td>{moment(equipmentState.createDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>{moment(equipmentState.updateDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>
                                <button type="button" className="btn btn-dark" 
                                        >
                                          <Link to={`/state/update/${equipmentState._id}`}>Editar</Link>
                                </button>
                              </td>                              
                          </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
  )
}
