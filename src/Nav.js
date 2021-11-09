import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Auth from './Auth/Auth';
export default class Nav  extends Component {
    render() {
        const {isAuthenticated,login,logout,isAdmin} = this.props.auth;
        return (
          <nav>
          <ul>
              <li><Link to="/" >Fablab Application</Link></li>
              {isAuthenticated() ? (<>
              <li><Link to="/profile" >Profile</Link></li>
              <li><Link to="/machines" >Machines</Link></li>
              </>
              ):(
                  <> </>
              )}
              {isAdmin()? (<>
              
              <li><Link to="/dashboard" >Dashboard</Link></li>
              </>
              ):(
                  <> </>
              )}

              
              <li>
                  <button onClick={isAuthenticated() ? logout : login}>
                      {isAuthenticated()? "Log out": "Log in"}
                  </button>
              </li>
          </ul>
          </nav>
        );
    }
}