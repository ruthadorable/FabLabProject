
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
  if(role!=3)
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


 function populateTable(c){
      const firstname=document.createTextNode(c.first_name);
      const lastname=document.createTextNode(c.last_name);
      const email=document.createTextNode(c.email);

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

  const userarea=document.getElementById("username")
  const message=document.createTextNode("Bonjour "+username);
  userarea.appendChild(message);

function populateTable(c){

      const firstname=document.getElementById("prenom");
      firstname.value=c.first_name;
      const lastname=document.getElementById("nom");
      lastname.value=c.last_name;
      const email=document.getElementById("email");
      email.value=c.email;
      const password=document.getElementById("motdepasse");
      password.value=c.password;
      const confirmpwd=document.getElementById("confmotdepasse");
      confirmpwd.value=c.password;

  }
  
  
  fetch(`/modification/user/${iduser}`)
  .then((response) => response.json())
  .then((userdata) => populateTable(userdata));
  

}

