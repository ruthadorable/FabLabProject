let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");
const token = get_cookie_name("jwt_token");
if(token){
  console.log("ok")
}else{
  const body=document.querySelector("body");
body.remove();
alert("Veillez d'abord vous connecter");
}

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
const role=decoded.role_id;
if(role!=1)
{
const body=document.querySelector("body");
body.remove();
alert("Vous n'avez pas accès à cette page");
}
document.getElementById("username").innerText=("   Bonjour "+username+" " );
function populateTable(c){
 
    document.getElementById("numero").value=c.num;
    const dateformat=c.date.toString().slice(0,10); 
    document.getElementById("date").value=dateformat;
    document.getElementById("total").value=c.amount_total;
    fetch(`/user/${c.userId}`)
    .then((res)=>res.json())
    .then(x=>{document.getElementById("utilisateur").value= x.first_name});

  }
fetch(`/admin/facture/${paramId}`)
  .then((response) => response.json())
  .then((facture) => {populateTable(facture); console.log(facture)});

  
document.getElementById('form').action=`/facture/update/${paramId}`;