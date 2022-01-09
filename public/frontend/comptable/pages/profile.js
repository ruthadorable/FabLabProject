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
      document.getElementById("prenom").value=c.first_name;
      document.getElementById("nom").value=c.last_name;
      document.getElementById("email").value=c.email;
      document.getElementById("motdepasse").value=c.password;
      document.getElementById("confmotdepasse").value=c.password;
  }
  
  
  fetch("/admin/profile")
    .then((response) => response.json())
    .then((userdata) => populateTable(userdata));
  
