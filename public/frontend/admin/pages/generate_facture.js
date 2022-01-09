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

var select = document.getElementById('annee');
var date = new Date();
var year = date.getFullYear();
for (var i = year - 4; i <= year + 3; i++) {
  var option = document.createElement('option');
  option.value = option.innerHTML = i;
  if (i === year) option.selected = true;
  select.appendChild(option);
}





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
if(role==2||role==3)
{
const body=document.querySelector("body");
body.remove();
alert("Vous n'avez pas accès à cette page");
}
document.getElementById("username").innerText=("   Bonjour "+username+" " );
function populateTable(c){

    
    document.getElementById("numéro").value=c.name;
    document.getElementById("date").value=c.image;
 //document.getElementById("equipementid").value=c.price_minute;
    document.getElementById("minutes").value=c.description;
  //  document.getElementById("utilisateurid").value=c.reserved;
  document.getElementById("tarif").value=c.description;
}
