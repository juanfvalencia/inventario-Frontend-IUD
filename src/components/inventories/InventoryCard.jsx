import React from 'react'
import { Link } from 'react-router-dom';

export const InventoryCard = (props) => {

    const { inven } = props

  return (
    <div className="col" key={inven._id}>
        <div className="card">
            <img src={inven.photo} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5>Características</h5>
                <hr />
                <p className="card-title">{`Serial: ${inven.serial}`}</p>
                <p className="card-title">{`Model: ${inven.model}`}</p>
                <p className="card-title">{`Marca: ${inven.mark.name}`}</p>
                <p className="card-text">{`Cliente: ${inven.user.name}`}.</p>
                <Link to={`inventories/update/${inven._id}`}>Ver Más...</Link>
            </div>
        </div>
    </div>
  )
}
