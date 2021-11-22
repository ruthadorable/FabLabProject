import axios from 'axios';
export const registerNewUser=()=>dispatch=>{

    dispatch({type:'USER_REGISTER_REQUEST'})

    axios
    .post("/api/users/register")
    .then(res=>{
        dispatch({
            type:'USER_REGISTER_SUCCES'
        })
    })
    .catch(err=>{
        dispatch({type:'USER_REGISTER_FAILED'})
    });

}