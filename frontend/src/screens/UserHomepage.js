import React from 'react';
import allmachines from '../data/allmachines';
import AllMachines from '../components/AllMachines';
import {Row} from 'react-bootstrap';

function UserHomepage() {
    return (
        <div>
            <h1>User Homescreen</h1>
            
                
                <h1>Liste de machines</h1> 
                
                 <Row>
                        {allmachines.map((val)=>(
                
                            <AllMachines product={val}/>
                
                        ))}
                </Row>
       
            
        </div>
    )
}

export default UserHomepage
