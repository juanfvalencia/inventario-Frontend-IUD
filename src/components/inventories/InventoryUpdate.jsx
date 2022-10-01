import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../services/userService';
import { getMarks } from '../../services/markService';
import { getEquipmentTypes } from '../../services/equipmentTypeService';
import { getEquipmentStates } from '../../services/equipmentStateService';
import { getInventoryById } from '../../services/inventoryService';
import { updateInventory } from '../../services/inventoryService';
import Swal from 'sweetalert2';

export const InventoryUpdate = () => {

  const { inventoryId = '' } = useParams();
  const [ users, setUsers ] = useState([]);
  const [ marks, setMarks ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ states, setStates ] = useState([]);
  const [ inventory, setInventory ] = useState({});
  const [ valuesForm, setValuesForm ] = useState({});

    const { serial = '', model = '', description = '', color = '', photo = '', buyDate = '', 
             price = '', user, mark, equipmentType, equipmentState } = valuesForm;

    useEffect(() => {
      const ListUser = async() => {
      try {
        const { data } = await getUsers();
        console.log(data)
        setUsers(data)
      } catch (error) {
          console.log(error);
        }
      }
      ListUser();
    }, [])
      
    useEffect(() => {
      const ListMark = async() => {
        try {
          const { data } = await getMarks();
          console.log(data)
          setMarks(data)
          } catch (error) {
            console.log(error);
          }
      }
      ListMark()
    }, [])
        
    useEffect(() => {
      const ListEquipmentType = async() => {
        try {
          const { data } = await getEquipmentTypes();
          console.log(data)
          setTypes(data)
        } catch (error) {
          console.log(error);
        }
      }
      ListEquipmentType()
    }, [])
      
    useEffect(() => {
      const ListEquipmentState = async() => {
        try {
          const { data } = await getEquipmentStates();
          console.log(data);
          setStates(data)
        } catch (error) {
            console.log(error)
          }
      }
      ListEquipmentState()
    }, [])

    useEffect(() => {
            setValuesForm({
                serial: inventory.serial,
                model: inventory.model,
                description: inventory.description,
                color: inventory.color,
                photo: inventory.photo,
                buyDate: inventory.buyDate,
                price: inventory.price,
                user: inventory.user,
                mark: inventory.mark,
                equipmentType: inventory.equipmentType,
                equipmentState: inventory.equipmentState
            });
    }, [ inventory ])

  

  useEffect(() => {
    const getInventory = async() => {
        try {
            Swal.fire({
              allowOutsideClick: false,
              text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getInventoryById(inventoryId)
            console.log(data)
            setInventory(data)
            Swal.close()
        } catch (error) {
            console.log(error);
            Swal.close()
        }
    }
    getInventory();
  }, [ inventoryId ])

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValuesForm({...valuesForm, [name]: value})
}

const handleOnSubmit = async (e) => {
    e.preventDefault()
    const inventory = {
        serial: serial, model: model, description: description, color: color, 
        photo: photo, buyDate: buyDate, price: price,
        user: {
            _id: user
        },
        mark: {
            _id: mark
        },
        equipmentType: {
            _id: equipmentType
        },
        equipmentState: {
            _id: equipmentState
        }
    }
    console.log(inventory);
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await updateInventory(inventoryId, inventory);
        console.log(data);
        Swal.close();
    } catch (error) {
        console.log(error)
        Swal.close();
    }
}

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalle Activo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={inventory?.photo} alt=''/>
                    </div>
                    <div className='col-md-8'>
                        <form onSubmit={ (e) => handleOnSubmit(e) }>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" name='serial' value={serial}
                                              required 
                                              className="form-control" 
                                              onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Modelo</label>
                                        <input type="text" name='model' value={model} 
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <input type="text" name='description' value={description} 
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Color</label>
                                        <input type="text" name='color' value={color} 
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">foto</label>
                                        <input type="url" name='photo' value={photo}
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha compra</label>
                                        <input type="date" name='buyDate' value={buyDate} 
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input type="number" name='price' value={price} 
                                                required
                                                className="form-control" 
                                                onChange={ (e) => handleOnChange(e)}/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario</label>
                                        <select className="form-select" 
                                                required
                                                onChange={ (e) => handleOnChange(e)}
                                                name='user'
                                                value={user}>
                                            <option value="" >--SELECCIONE--</option>
                                            {
                                                users.map(({ _id, name}) => {
                                                    return <option key={_id} value={_id}>{name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Marca</label>
                                        <select className="form-select" 
                                                required
                                                onChange={ (e) => handleOnChange(e)}
                                                name='mark'
                                                value={mark}>
                                            <option value="" >--SELECCIONE--</option>
                                            {
                                                marks.map(({_id, name}) => { 
                                                    return <option key={_id} value={_id}>{name}</option>
                                                })
                                            }   
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo equipo</label>
                                        <select className="form-select" 
                                                required
                                                onChange={ (e) => handleOnChange(e)}
                                                name='equipmentType'
                                                value={equipmentType}>
                                            <option value="" >--SELECCIONE--</option>
                                            {
                                                types.map(({_id, name})=> {
                                                    return <option key={_id} value={_id}>{name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Estado equipo</label>
                                        <select className="form-select" 
                                                required
                                                onChange={ (e) => handleOnChange(e)}
                                                name='equipmentState'
                                                value={equipmentState}>
                                            <option value="" >--SELECCIONE--</option>
                                            {
                                                states.map(({_id, name}) => {
                                                    return <option key={_id} value={_id}>{name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
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
