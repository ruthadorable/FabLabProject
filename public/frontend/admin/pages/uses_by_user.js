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
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");
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
const list = document.getElementById("list");

function populateTable(uses) {

const useRows = uses.map((c) => {

  
  const row = document.createElement("tr");
  const dateCol = document.createElement("td");
  const dateTxt = document.createTextNode(c.date.toString().slice(0,10));
  dateCol.appendChild (dateTxt);
  row.appendChild( dateCol);

  fetch(`/equipement/${c.equipmentId}`)
  .then((response)=>response.json())
  .then((x=>{
    
  const equipementCol = document.createElement("td");
  const eCol=document.createTextNode(x.name);
  equipementCol.appendChild(eCol);
  row.appendChild(equipementCol);

  const tarifCol = document.createElement("td"); 
  const tCol=document.createTextNode(x.price_minute+"€");
  tarifCol.appendChild(tCol);
  row.appendChild(tarifCol);
  
  }));
  
  

  const dureeCol = document.createElement("td");
  const dureeTxt = document.createTextNode(c.durating_M);
  dureeCol.appendChild(dureeTxt);
  row.appendChild(dureeCol);

  const amountCol = document.createElement("td");
  const amountTxt = document.createTextNode(c.amount_to_be_paid+"€");
  amountCol.appendChild (amountTxt);
  row.appendChild( amountCol);


  const facturéCol = document.createElement("td");
  const facturéTxt = document.createTextNode(c.facturé);
  facturéCol.appendChild (facturéTxt);
  row.appendChild( facturéCol);;
  
  return row;
});
const tableBody = list.querySelector("tbody");
tableBody.replaceChildren(...useRows);
};
fetch(`/uses/${paramId}`)
.then((response) => response.json())
.then((uses) => populateTable(uses));

fetch(`/getuserbyid/${paramId}`)
    .then((response)=>response.json())
    .then((x)=>{
        const user=document.getElementById("user");
        const text=document.createTextNode(x.first_name);
        user.appendChild(text);
    })