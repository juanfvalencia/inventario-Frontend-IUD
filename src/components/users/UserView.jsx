import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getUsers, createUser } from '../../services/userService'
import Swal from 'sweetalert2';

export const UserView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ users, setUsers ] = useState([]);
  const { name = '', email = '', state = '' } = valuesForm;

  const ListUsers = async() => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      Swal.showLoading()
      const { data } = await getUsers();
      setUsers(data)
      console.log(data);
      Swal.close()
    } catch (error) {
      console.log(error)
      Swal.close()
    }
  }

  useEffect(() => {
    ListUsers()
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setValuesForm({...valuesForm, [name]: value});
  }

  const handleCreateUser = async(e) =>{
    e.preventDefault()
    console.log(valuesForm);
    try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        })
        Swal.showLoading()
        const { data } = await createUser(valuesForm)
        console.log(data);
        setValuesForm({name: '', email: '', state: ''})
        ListUsers();
        Swal.close()
    } catch (error) {
        console.log(error)
        Swal.close()
    }
  }

  return (
    <div className='container-fluid '>
          <div className='card'>
            <form onSubmit={(e) => handleCreateUser(e)}>
              <div className='row container-g'>
                <div className="col mb-3">
                  <label className="form-label label-t"><strong>Nombre</strong></label>
                  <input name= 'name' value={name} type="text" className="form-control" 
                    onChange={(e) => handleOnChange(e)}/>
                </div>
                <div className="col mb-3">
                  <label className="form-label label-t"><strong>Email</strong></label>
                  <input name= 'email' value={email} type="email" className="form-control" 
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
                  <th scope="col">Email</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha de compra</th>
                  <th scope="col">Fecha de actualización</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length > 0 && users.map((user, index) =>{
                    return <tr key={user._id}>
                              <td value={user._id} name={user._id}>{index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.state}</td>
                              <td>{moment(user.createDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>{moment(user.updateDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>
                                <button type="button" className="btn btn-dark" 
                                        >
                                          <Link to={`/user/update/${user._id}`}>Editar</Link>
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
