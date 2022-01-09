<<<<<<< HEAD
=======
<<<<<<<< HEAD:public/frontend/admin/pages/profile.js
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399
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
<<<<<<< HEAD
  if(role!=3)
=======
  if(role!=1)
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399
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
<<<<<<< HEAD
=======
========
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
const token = get_cookie_name("jwt_token");
const decoded= parseJwt(token);
  const username=decoded.preferred_username;
  const iduser=decoded.sub;
  const decoded=parseJwt(token);
  const role=decoded.role_user;
  const userarea=document.getElementById("username")
  const message=document.createTextNode("Bonjour "+username);
  userarea.appendChild(message);
function populateTable(c){
>>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399:public/frontend/comptable/pages/profile.js
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399
      document.getElementById("prenom").value=c.first_name;
      document.getElementById("nom").value=c.last_name;
      document.getElementById("email").value=c.email;
      document.getElementById("motdepasse").value=c.password;
      document.getElementById("confmotdepasse").value=c.password;
<<<<<<< HEAD
  }
  
  
  fetch("/admin/profile")
    .then((response) => response.json())
    .then((userdata) => populateTable(userdata));
  
=======
}
fetch("/admin/profile")
    .then((response) => response.json())
    .then((userdata) => populateTable(userdata));
<<<<<<<< HEAD:public/frontend/admin/pages/profile.js
  
========


    
>>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399:public/frontend/comptable/pages/profile.js
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399
