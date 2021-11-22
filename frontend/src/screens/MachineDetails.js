import React, { Component,useState,useEffect } from 'react';
import {Container,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import AllMachines from '../components/AllMachines'
import { Image } from 'react-bootstrap';

import allmachines from '../data/allmachines'


const MachineDetails = ({match}) => {
    const machineId=match.params.id;
    const machine=allmachines.find(product=>product._id==machineId);
    return (
        <div>
            <Link to="/machines"> retour à la liste des machines</Link>
            <h1>{machine.nom}</h1>
                <Image src={machine.image}/>
                <br></br>
                Modele: {machine.modele}<br></br>
                Descriptions: {machine.specificite1}<br></br>
                {machine.specificite2}<br></br>{machine.specificite2}<br></br>
                Tarif par minute : {machine.prixparminute} euros <br></br>
                
        </div>
    )
}

export default MachineDetails
