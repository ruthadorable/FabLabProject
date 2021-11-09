import React from 'react'

const Machine = ({machine}) => {
    const styleTitle = {
        fontSize: 44, 
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: 'Indie Flower'
    }
    const styleDescription={
        fontSize: 24,
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: 'Indie Flower'

}
    return (
        <div>
            <center>
            <h2 style={styleTitle}><u>{machine.name}</u></h2>
            <br/>
            <br/><div class=" col-lg-8 mx-auto d-flex justify-content-around my-2 sortBtn flex-wrap">
                <img src={machine.image} class="img-fluid" alt="Responsive image"/>
                </div>
            <br/>
            <div class=" col-lg-8 mx-auto d-flex justify-content-around my-2 sortBtn flex-wrap">
            <p style={styleDescription}>{machine.description}</p>
            </div>
            </center>
            
        </div>
    )
}

export default Machine