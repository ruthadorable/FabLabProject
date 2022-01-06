
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
if(role!=2)
{
const body=document.querySelector("body");
body.remove();
alert("Vous n'avez pas accès à cette page");
}
document.getElementById("username").innerText=("   Bonjour "+username+" " );
const list = document.getElementById("list");
function populateTable(users) {

const userRows = users.map((c) => {
  const row = document.createElement("tr");
  const dateCol = document.createElement("td");
  const dateTxt = document.createTextNode(c.date);
  dateCol.appendChild (dateTxt);
  row.appendChild( dateCol);

  fetch(`/equipement/${c.equipmentId}`)
  .then((response)=>response.json())
  .then((x)=>{
    equipementTxt = document.createTextNode(x.name);
    tarifTxt = document.createTextNode(x.price_minute);
  });
  console.log(equipementTxt+" "+tarifTxt);
  const equipementCol = document.createElement("td");
  equipementCol.appendChild(equipementTxt);
  row.appendChild(equipementCol);

  const tarifCol = document.createElement("td");
  
  tarifCol.appendChild(tarifTxt);
  row.appendChild(tarifCol);

  const dureeCol = document.createElement("td");
  const dureeTxt = document.createTextNode(c.durating_M);
  dureeCol.appendChild(dureeTxt);
  row.appendChild(dureeCol);

  const amountCol = document.createElement("td");
  const amountTxt = document.createTextNode(c.amount_to_be_paid);
  amountCol.appendChild (amountTxt);
  row.appendChild( amountCol);


  const facturéCol = document.createElement("td");
  const facturéTxt = document.createTextNode(c.facturé);
  facturéCol.appendChild (facturéTxt);
  row.appendChild( facturéCol);;

  const modifCol = document.createElement("td");
  const modifBtn = document.createElement("a");
  const modifTxt = document.createTextNode("Modifier");
  modifBtn.user="btn btn-primary"
  modifBtn.appendChild(modifTxt);
  modifBtn.href=`modifier_user.html?id=${c.id}`;
  modifCol.appendChild(modifBtn);
  row.appendChild(modifCol);

  
  const deleteCol = document.createElement("td");
  const button=document.createElement("a");
  const btnTxt=document.createTextNode("Supprimer");
  button.appendChild(btnTxt);
  button.user="btn btn-primary"
  button.href=`supprimer_user.html?id=${c.id}`;
  deleteCol.appendChild(button);
  row.appendChild(deleteCol);

  
  return row;
});
const tableBody = list.querySelector("tbody");
tableBody.replaceChildren(...userRows);
}
fetch("/uses")
.then((response) => response.json())
.then((uses) => populateTable(uses));
