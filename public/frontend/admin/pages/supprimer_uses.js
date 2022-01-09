
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

document.getElementById("username").innerText=("   Bonjour "+username+" " );
//si facturé est vrai alors on ne  peut pas supprimer
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");

function affichageEcran(x){



if(!x.facturé){
    if(confirm("Etes vous sûre de supprimer cet utilisation?"))
    {
            window.location.href=`supprimer_use_reception.html?id=${paramId}`;
    }
}else{
    const content=document.getElementById("content");
    content.innerText="Impossible de supprimer car il faut que sa facture soit supprimé avant !! \n Voir lien => ";
    const lien=document.createElement("a");
    const btnTxt=document.createTextNode("Details facture");
    lien.href=`invoice_details.html?id=${paramId}`;
    lien.appendChild(btnTxt);
    content.appendChild(lien);
}
}



fetch(`/utilisation/${paramId}`)
.then((response)=>response.json())
.then((x)=>affichageEcran(x))

