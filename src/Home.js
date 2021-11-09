import React, { Component,useState,useEffect } from 'react';
import {Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import AllMachines from './components/AllMachines'
import Message from './components/Message'
import Loader from './components/Loader'
import allmachines from './listemachines/allmachines'
import {listMachines} from './actions/productActions'



const Home = () =>{
         /*const productList=useSelector((state)=>state.productList);
         const {loading,error,products}=productList;
         const dispatch=useDispatch();*/
    
        /*useEffect(()=>{
            dispatch(listMachines())
            },[dispatch])*/


       /* const {isAuthenticated,login} = this.props.auth;*/
        
    
    const styleH1 = {
        fontFamily: 'Open Sans',
        fontSize: 25,
        margin: '10px',
        color: 'light-grey'
    }
        return (
            <div>
                <h1>Home</h1>
                
         </div>
        )
    
}

export default Home;