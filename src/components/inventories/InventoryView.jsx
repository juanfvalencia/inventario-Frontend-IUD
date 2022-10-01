import React, { useState, useEffect} from 'react';
import { getInventories} from '../../services/inventoryService'
import { InventoryCard } from './InventoryCard';
import { InventoryNew } from './InventoryNew';
import Swal from 'sweetalert2';

export const InventoryView = () => {

const [ inventory, setInventory ] = useState([]);
const [ openModal, setOpenModal ] = useState(false);

const ListInventories = async() => {
    try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'cargando...'
        })
        Swal.showLoading()
        const { data } = await getInventories();
        setInventory(data)
        Swal.close()
    } catch (error) {
      console.log(error)
      Swal.close()
    }
}

useEffect(() =>{
  ListInventories();
}, [])

const handleOpenModal = () => {
  setOpenModal(!openModal)
}

  return (
    <div className='container-fluid'>
      <div className="mt-2 row row-cols-1 row-cols-md-4 g-4">
          {
            inventory.map((inven) => {
              return(
                <InventoryCard key={inven._id} inven={inven}/>
                )
            })
          }
      </div>
      {
        openModal ? <InventoryNew 
                                  handleOpenModal={ handleOpenModal } 
                                  ListInventories={ ListInventories }/> :
                (<button className='btn btn-primary fab' onClick={ handleOpenModal }>
                    <i className='fa-solid fa-plus'></i>
                </button>)
      }
    </div>
  )
}
