import React, { Component } from 'react'
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Fablab Application</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="right navbar-nav  nav-pills ">
        <li class="nav-item">
          <Link to="/register" class="nav-link active" aria-current="page" href="#">S'inscrire</Link>
        </li>
        
        
      </ul>
    </div>
  </div>
</nav>
    )
}

export default Navbar

