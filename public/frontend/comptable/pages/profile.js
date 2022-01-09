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
      document.getElementById("prenom").value=c.first_name;
      document.getElementById("nom").value=c.last_name;
      document.getElementById("email").value=c.email;
      document.getElementById("motdepasse").value=c.password;
      document.getElementById("confmotdepasse").value=c.password;
}
fetch("/admin/profile")
    .then((response) => response.json())
    .then((userdata) => populateTable(userdata));


    