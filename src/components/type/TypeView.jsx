import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getEquipmentTypes, createEquipmentType } from '../../services/equipmentTypeService';
import Swal from 'sweetalert2';

export const TypeView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ equipmentTypes, setEquipmentTypes ] = useState([]);
  const { name = '', state = '' } = valuesForm;

  const ListTypes = async() => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading()
      const { data } = await getEquipmentTypes()
      setEquipmentTypes(data)
      Swal.close()
    } catch (error) {
      console.log(error);
      Swal.close()
    }
  }

  useEffect(() => {
    ListTypes()
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setValuesForm({...valuesForm, [name]: value});
  }

  const handleCreateMark = async(e) =>{
    e.preventDefault()
    try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        })
        Swal.showLoading()
        const { data } = await createEquipmentType(valuesForm)
        setValuesForm({name: '', state: ''})
        ListTypes();
        Swal.close()
    } catch (error) {
        console.log(error)
        Swal.close()
    }
  }

  return (
    <div className='container-fluid '>
          <div className='card'>
            <form onSubmit={(e) => handleCreateMark(e)}>
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
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha de creación</th>
                  <th scope="col">Fecha de actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  equipmentTypes.length > 0 && equipmentTypes.map((equipmentType, index) =>{
                    return <tr key={equipmentType._id}>
                              <td value={equipmentType._id} name={equipmentType._id}>{index + 1}</td>
                              <td>{equipmentType.name}</td>
                              <td>{equipmentType.state}</td>
                              <td>{moment(equipmentType.createDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>{moment(equipmentType.updateDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>
                                <button type="button" className="btn btn-dark" 
                                        >
                                          <Link to={`/type/update/${equipmentType._id}`}>Editar</Link>
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
