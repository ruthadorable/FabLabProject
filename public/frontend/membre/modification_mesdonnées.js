function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
function get_cookie_name(name) 
{
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    console.log(match[2]);
    return match[2];
  }
  else{
       console.log('--something went wrong---');
  }
}
var old;
const token = get_cookie_name("jwt_token");
const decoded=parseJwt(token);
const username=decoded.preferred_username;
const iduser=decoded.sub;
document.getElementById("username").innerHTML=("Bonjour "+username);
const newpassword = document.getElementById("newmotdepasse");
const confpassword = document.getElementById("confmotdepasse"); 
function check(elem){
  if(elem.value.length>0){
       if(elem.value!=newpassword.value){
    
        document.getElementById("alert").innerText="Les 2 mots de passe ne sont pas identiques!"
       }else{
        document.getElementById("alert").innerText="";    
       }
}
}
function checkold(){

  const oldpassword = document.getElementById("oldmotdepasse");
  
    if (oldpassword.value != old)
    {
      document.getElementById("alertold").innerText="L'ancien mot de passe n'est pas correcte!";
    }else{
      document.getElementById("alertold").innerText="";
    }
}


function populateTable(c){
    document.getElementById("nom").value=c.first_name;
    document.getElementById("prenom").value=c.last_name;
    document.getElementById("email").value=c.email;
     old=c.password;
}

fetch(`/modification/user/${iduser}`)
  .then((response) => response.json())
  .then((userdata) => populateTable(userdata));

  //validate old password
  
    //validate new and confirm passsword
