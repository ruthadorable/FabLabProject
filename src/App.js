import React ,{Component} from 'react';
import {BrowserRouter as Router ,Route,Redirect} from 'react-router-dom';
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from './Auth/Auth';
import Callback from './Callback';
import Public from "./Public";
import Private from "./Private";
import Machines from "./Machines";
import Machine from "./components/Machine";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";
export default class App extends Component {
  constructor(props){
    super(props);
    this.auth=new Auth(this.props.history);
  }
    render() {
        return (
          <>
          
          <Router>
          <Nav auth ={this.auth}/>
          <div className="body">
          <Route path="/" exact render={props=> <Home auth={this.auth} {...props}/> } />
          <Route path="/callback" exact render={props=> <Callback auth={this.auth} {...props}/> } />
          <Route path="/machines" exact render={props=> <Machines auth={this.auth} {...props}/> } />
          <Route path="/dashboard" exact render={props=> <Dashboard auth={this.auth} {...props}/> } />
          <Route path="/machine/:id" exact render={props=> <Machine auth={this.auth} {...props}/> } />
          <Route path="/profile" exact  render={props=> this.auth.isAuthenticated()?
           (<Profile auth={this.auth} {...props}/>  
            ):(
              <Redirect to="/" />
            )
          } 
            />
          </div>
          </Router>
          
          </>
        );
    }
}