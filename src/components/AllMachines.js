import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'


const AllMachines = ({product}) => {
    return (
        <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item" data-item={product.categorie}>
        <Card class="card">
        <div class="img-container">
          <Link to={`/machine/${product._id}`}>
            <Card.Img src={product.image} />
            </Link>
            <span class="store-item-icon" >
              <i class="fas fa-shopping-cart" href="/Cart"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 id="store-item-name">{product.nom}</h5>
              <h5 class="store-item-value"><strong id="store-item-price" class="font-weight-bold">{product.prixparminute}</strong>€</h5>

            </div>
          </div>
          </Card>
      </div>
       
      
    )
}

export default AllMachines