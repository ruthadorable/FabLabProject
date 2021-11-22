import React from 'react'
import {Container} from 'react-bootstrap'
const Body = () => {
    const styleTitle = 
    {
        color: 'black',
        fontFamily: 'Courgette',
        fontSize: 50,
    }
    return (
        <div>
            <Container>
            <center>
                <h1 style={styleTitle}>Bienvenu dans l'application de gestion des utilisations des machines Fablab</h1>
            </center>
            </Container>
        </div>
    )
}

export default Body;