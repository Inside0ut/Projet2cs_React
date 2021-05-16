/*
    list of vehicles
*/

import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import VehicleComponent from './VehicleComponent';
import './style/VehicleList.css';

const ManagePage = () =>{
    const [nbPage, setNbPage] = useState(0);
    const [nbOfPages, setNbOfPages] = useState(0);
    const [nbVehiculesPerPage, setNbVehiculesPerPage] = useState(20);
    const [vehicles, setVehicles] = useState([]);

    // fetch data on mount component
    useEffect(() => {
        // just fetch the data inside the vehicles state initially with page = 0
        axios.get(`http://localhost:8081/vehicle?page=${nbPage}&limit=${nbVehiculesPerPage}`)
        .then((response) => response.data)
        .then(({nbVehicles, nbPages, listVehicles}) => {
            setVehicles(listVehicles);
            setNbOfPages(nbPages);
         })
     
    }, [nbPage]);

    return(
        <div className='list-container'>
            <div>
                <p>Ordonner</p>
                <p>Filtrer</p>
            </div>
            <ul className="vehicle-list">
                <li className='headers'>
                    <p>Vehicule</p>
                    <p>Client</p>
                    <p>Disponible le</p>
                    <p>Status</p>
                </li>
                {
                    vehicles.map((vehicle) =>
                        <VehicleComponent vehicle={vehicle} />
                    )
                }
            </ul>
            <div className='pagination'>
                <p>Lignes par page: </p>
                
                <p>1-{nbVehiculesPerPage} of {vehicles.length}</p>
                <div className='arrows'>
                    <button><i className='arrow left'></i></button>
                    <button><i className='arrow right'></i></button>
                </div>
            </div>
        </div>
    );
}
 export default ManagePage;