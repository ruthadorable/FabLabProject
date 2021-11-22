import React,{useState,useDispatch} from 'react'
import {Link} from 'react-router-dom'
import registerNewUser from '../actions/utilisateurActions';
function Register() {
    const [nom,setNom]=useState('');
    const [prenom,setPrenom ]=useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch=useDispatch();

    const register =(e)=>{
        e.preventDefault();
        if(password==confirmPassword){
            const utilisateur={
                nom: nom,
                prenom:prenom,
                email: email,
                password:password,

            }
        }
        else {
           alert('les mots de passe ne sont pas identiques'); 
        }
    }
  
    return (
        <div>
                                                                           
            <div class="row justify-content-center">
		        
		    <div class="col-md-4 card"> 
            <Link to="/">Retour </Link>    
            <div ></div>                                      
               <h2 class="text-center"> S'inscrire    </h2>
               <form onSubmit={register}>
                <input type="text"
                    placeholder="Nom"
                    class="form-control"
                    required
                    value={nom}
                    onChange={(e)=>{setNom(e.target.value)}}/>
                <input type="text"
                    placeholder="Prenom"
                    class="form-control"
                    required
                    value={prenom}
                    onChange={(e)=>{setPrenom(e.target.value)}}/>
                <input type="text"
                    placeholder="email"
                    class="form-control"
                    required
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="text"
                    placeholder="Mot de passe"
                    class="form-control"
                    required
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                <input type="text"
                    placeholder="Confirmer mot de passe"
                    class="form-control"
                    required
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                    <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary" >S'inscrire</button>
                </div>
                </form>
                <br/>
    <div class="col-md-12 text-center">
        <p> Déjà inscrit ?<Link   to="/"> Se connecter </Link>
        </p>
    </div>
   
                
	          
			</div>			
            <div id="aside">                                                    
                           						  
            </div>
       
            </div>
        </div>
    )
}

export default Register
