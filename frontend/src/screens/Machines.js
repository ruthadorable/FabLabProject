import React, { Component,useState,useEffect } from 'react';
import {Container,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import AllMachines from '../components/AllMachines'

import allmachines from '../data/allmachines'


export default class Machines extends Component {
    render() {
        const styleH1 = {
            fontFamily: 'Open Sans',
            fontSize: 50,
            margin: '10px',
            color: 'light-grey',
            textAlign:'center',
        }
          
        return (
            <div>
                
                <h1 style={styleH1}>Liste de machines</h1> 
                
                 <Row>
                        {allmachines.map((val)=>(
                
                            <AllMachines product={val}/>
                
                        ))}
                </Row>
       
            </div>
        )
        
    }
}
