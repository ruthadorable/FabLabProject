import logo from './logo.svg';
import {BrowserRouter as Router ,Switch, Route,Redirect} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import './App.css';
import Navbar from './components/Navbar';
import UserHomepage from './screens/UserHomepage';
import Homescreen from './screens/Homescreen';
import Login from './components/Login';
import Register from './screens/Register';
import AllMachines from './components/AllMachines';
import AdminHomepage from './screens/AdminHomepage';
import ComptableHomecreen from './screens/ComptableHomecreen';
import Role from './screens/Role';
import Body from './components/Body';
import Footer from './components/Footer'
import { Factures } from './screens/Factures';
import Machines from './screens/Machines';
import MachineDetails from './screens/MachineDetails';
function App() {
  return (
    <Router>
     <Navbar/>
     <main className="py-3">
       <Container>
         
         <Route path='/' component={Homescreen} exact/>
         <Route path='/login' component={Login} exact/>
         <Route path='/register'component={Register} exact/>
         <Route path='/machines'component={Machines} exact/>
         <Route path='/machines/:id'component={MachineDetails} exact/>
         <Route path='/user/:id' component={UserHomepage}/>
         <Route path='/admin'component={AdminHomepage} exact/>
         <Route path='/comptable' component={ComptableHomecreen} exact/>
         <Route path='/role' component={Role} exact/>
         <Route path='/comptable/factures' component={Factures} exact/>
         <Route path='/comptable/factures/:id' component={Factures} exact/>
         
       </Container>
       
     </main> 
     <Footer/>
    </Router>
  );
}

export default App;
