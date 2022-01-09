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
  if(role!=1)
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


//si facturé est vrai alors on ne  peut pas supprimer
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");


fetch(`/utilisation/${paramId}`)
.then((response)=>response.json())
.then((x)=>{
if(x.facturé){
  const content=document.getElementById("content");
  content.innerText="Impossible de supprimer car il faut que sa facture soit supprimé avant !! \n Voir lien => ";
  const lien=document.createElement("a");
  const btnTxt=document.createTextNode("Details facture");
  lien.href=`invoice_details.html?id=${paramId}`;
  lien.appendChild(btnTxt);
  content.appendChild(lien);
}
})

function deleteuse(){
  fetch(`/use/delete/${paramId}`)
  const content=document.getElementById("content");
  content.remove();
  const messagearea=document.getElementById("message");
  const message=document.createTextNode("L'utilisation a bien été supprimé !");
  messagearea.appendChild(message); 
}

function redirectpage(){

window.location.href="usestable.html";


}

