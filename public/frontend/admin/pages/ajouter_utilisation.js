let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");


function populateList1(machines)
{
  
  const options= machines.map(x=>`<option value=${x.id}>${x.name}</option>`).join('\n');
  const selectequipement=document.getElementById("equipementid")
  selectequipement.innerHTML=options;
}
function populateList2(users)
{
  const options= users.map(x=>`<option value=${x.id}>${x.first_name}</option>`).join('\n');
  const selectmembre=document.getElementById("userid")
  selectmembre.innerHTML=options;
}



fetch("/members")
.then((response)=>response.json())
.then((users)=>{populateList2(users); console.log(users);});

fetch("/equipement")
.then((response)=>response.json())
.then((machines)=>{populateList1(machines); console.log(machines);});


function calculMontant(){


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

// function populateTable(c){

//     const firstname=document.createTextNode(c.first_name);
//     const lastname=document.createTextNode(c.last_name);
//     const email=document.createTextNode(c.email);
//     document.getElementById("nom").value=c.name;
//     document.getElementById("image").value=c.image;
//     document.getElementById("tarif").value=c.price_minute;
//     document.getElementById("description").value=c.description;
//     document.getElementById("reserved").value=c.reserved;
// }
// fetch(`/admin/equipement/${paramId}`)
//   .then((response) => response.json())
  // .then((equipement) => populateTable(equipement));
  
  const date = document.querySelector("#date")
  var today = new Date();
  var date1 =today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
  date.value = date1
  const idusername = document.querySelector("#idusername")
  const equipement = document.querySelector("#equipement")
  const tarif = document.querySelector("#tarif")
  const fetchReq1 = fetch('/users').then((res) => res.json());
  const fetchReq2 = fetch('/equipement').then((res) => res.json());
  const data = Promise.all([fetchReq1,fetchReq2]);
  let a ;
  data.then((res) =>{ res[0].forEach(element => {
    let option = document.createElement('option')
    option.value = element.id 
    option.textContent = element.first_name + " " + element.last_name
    idusername.appendChild(option) });
    a = res[1];
    res[1].forEach(element => {
      let option = document.createElement('option')
      option.value = element.id 
      option.textContent = element.name
      equipement.appendChild(option) 
    });
    
    
})
function newTarif() {
  let valeur = a.filter(el=>el.id==equipement.value)
  tarif.value = valeur[0].price_minute
}
equipement.addEventListener("change", newTarif)

