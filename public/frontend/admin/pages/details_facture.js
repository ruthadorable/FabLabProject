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


const list = document.getElementById("list");


function populateTable(c){
    
  const idCol = document.getElementById("id");
  const idTxt = document.createTextNode(c.id);
  idCol.appendChild(idTxt);
  const usernameCol = document.getElementById("membre");
  fetch(`/user/${c.userId}`)
  .then((response)=>response.json())
  .then((user)=>{
  
  const usernameTxt = document.createTextNode(user.first_name+" "+user.last_name);
  usernameCol.appendChild(usernameTxt);
  });
  
  const dateCol= document.getElementById("date");
  const dateTxt = document.createTextNode(c.date.toString().slice(0,10));
  dateCol.appendChild(dateTxt);

  fetch(`/admin/equipement/${c.equipmentId}`)
  .then((response)=>response.json())
  .then((machine)=>{
  const machinenameCol = document.getElementById("equipmentname");
  const machinenameTxt = document.createTextNode( machine.name);
   machinenameCol.appendChild( machinenameTxt);

   const machinetarifCol = document.getElementById("equipmenttarif");
  const machinetarifTxt = document.createTextNode( machine.price_minute);
   machinetarifCol.appendChild( machinetarifTxt);
  })

  fetch(`/utilisation/${paramId}`)
  .then((response)=>response.json())
  .then((use)=>{
  const dureeCol = document.getElementById("duree");
  const dureeTxt = document.createTextNode(use.durating_M);
  dureeCol.appendChild(dureeTxt);
  })

  const amountCol = document.getElementById("amount");
  const amountTxt = document.createTextNode(c.amount_total+"€");
  amountCol.appendChild(amountTxt);
  
}
fetch(`/admin/facture/${paramId}`)
.then((response)=>response.json())
.then((x)=>{populateTable(x)})