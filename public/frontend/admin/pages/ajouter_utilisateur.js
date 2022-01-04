let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");

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
document.getElementById("username").innerText=("   Bonjour "+username+" " );
function populateTable(c){

    const firstname=document.createTextNode(c.first_name);
    const lastname=document.createTextNode(c.last_name);
    const email=document.createTextNode(c.email);
    document.getElementById("nom").value=c.name;
    document.getElementById("image").value=c.image;
    document.getElementById("tarif").value=c.price_minute;
    document.getElementById("description").value=c.description;
    document.getElementById("reserved").value=c.reserved;
}
fetch(`/admin/equipement/${paramId}`)
  .then((response) => response.json())
  .then((equipement) => populateTable(equipement));

