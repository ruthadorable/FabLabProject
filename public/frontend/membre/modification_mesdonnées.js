let old="";
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

const token = get_cookie_name("jwt_token");


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const decoded=parseJwt(token);
const username=decoded.preferred_username;
const iduser=decoded.sub;
const role=decoded.role_user;

if(token){
  console.log("ok"),
  console.log(token),
  console.log(decoded),
  console.log(role)
  if(role!=2)
  {
    const body=document.querySelector("body");
    body.remove();
    alert("Vous n'avez pas accès à cette page");
  }
  document.getElementById("username").innerText=("   Bonjour "+username+" " );
}else{
  const body=document.querySelector("body");
  body.remove();
  alert("Veillez d'abord vous connecter");
}

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




function populateTable(c){
    document.getElementById("nom").value=c.first_name;
    document.getElementById("prenom").value=c.last_name;
    document.getElementById("email").value=c.email;
     old=c.password;
}

fetch(`/modification/user/${iduser}`)
  .then((response) => response.json())
  .then((userdata) => populateTable(userdata));

  function checkold(el){
    if(el.value.length>0){
      if (el.value == old)
      {
        console.log(el.value+" "+old);
        document.getElementById("alertold").innerText="";
        
      }else{
        console.log(el.value+" "+old);
        document.getElementById("alertold").innerText="L'ancien mot de passe n'est pas correcte!";
      }
    }
  }

