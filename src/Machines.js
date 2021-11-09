import React, { Component,useState,useEffect } from 'react';
import {Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import AllMachines from './components/AllMachines'
import Message from './components/Message'
import Loader from './components/Loader'
import allmachines from './listemachines/allmachines'
import {listMachines} from './actions/productActions'

export default class Machines extends Component {
    render() {
        const styleH1 = {
            fontFamily: 'Open Sans',
            fontSize: 25,
            margin: '10px',
            color: 'light-grey'
        }
          
        return (
            <div>
                
                <h1>Liste de machines</h1> 
                
                 <Row>
                        {allmachines.map((val)=>(
                
                            <AllMachines product={val}/>
                
                        ))}
                </Row>
       
            </div>
        )
        
    }
}
