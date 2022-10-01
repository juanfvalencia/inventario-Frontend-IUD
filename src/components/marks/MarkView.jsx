import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getMarks, createMark } from '../../services/markService'
import Swal from 'sweetalert2';

export const MarkView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ marks, setMarks ] = useState([]);
  const { name = '', state = '' } = valuesForm;

  const listMarks = async() => {
    try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        })
        Swal.showLoading()
        const { data } = await getMarks();
        setMarks(data);
        console.log(data)
        Swal.close()
    } catch (error) {
        console.log(error);
        Swal.close()
    }
  }

  useEffect(() =>{
    listMarks();
  }, [])

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setValuesForm({...valuesForm, [name]: value});
  }

  const handleCreateMark = async(e) =>{
    e.preventDefault()
    console.log(valuesForm);
    try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        })
        Swal.showLoading()
        const { data } = await createMark(valuesForm)
        console.log(data);
        setValuesForm({name: '', state: ''})
        listMarks();
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
                  <th scope="col">Fecha de compra</th>
                  <th scope="col">Fecha de actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  marks.length > 0 && marks.map((mark, index) =>{
                    return <tr key={mark._id}>
                              <td value={mark._id} name={mark._id}>{index + 1}</td>
                              <td>{mark.name}</td>
                              <td>{mark.state}</td>
                              <td>{moment(mark.createDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>{moment(mark.updateDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>
                                <button type="button" className="btn btn-dark" 
                                        >
                                          <Link to={`/mark/update/${mark._id}`}>Editar</Link>
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
