import React, { PureComponent ,useState} from 'react'
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const bloc={
        textAlign:'center',
        justifyContent:'center',
        backgroundColor: '#ed951a',
        height: '220',
        width: '500px',
        borderRadius: 15,
        marginTop: '100px'
    }
    const titleH1={
        textSize:'10px'
    }
    const login =(e)=>{

        e.preventDefault();
        const utilisateur={
                
                email: email,
                password:password,

            }
        }
        
    return (
        <>
        <div style={bloc} ></div>     
        <div class="row justify-content-center">
		        
		    <div class="col-md-4 card"> 
            
                                             
               <h2 class="text-center"> Se connecter    </h2>
               <form onSubmit={login} >
               <input type="email"
                    placeholder="Email"
                    class="form-control "
                    value={email} 
                    required
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password"
                    placeholder="Mot de passe"
                    class="form-control"
                    value={password} 
                    required
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary justify-content-center" >Se connecter</button>
                </div>
                </form>
    <br/>
    <div class="col-md-12 text-center">
        <p> Pas encore inscrit ?<Link   to="/register"> S'inscrire </Link>
        </p>
    </div>
   
       
      </div>
      </div>
      </>
    );
}
