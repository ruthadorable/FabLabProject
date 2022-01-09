let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");

function populateList1(machines)
{
  
  const options= machines.map(x=>`<option value=${x.id}>${x.name}</option>`).join('\n');
  const selectequipement=document.getElementById("equipementid")
  selectequipement.innerHTML=options;
}
function populateArea(user)
{
  const area=document.getElementById("membre");
  const text=document.createTextNode(user.first_name);
  area.appendChild(text);
}



fetch(`/user/${paramId}`)
.then((response)=>response.json())
.then((user)=>{populateArea(user);});

fetch("/equipement")
.then((response)=>response.json())
.then((machines)=>{populateList1(machines); console.log(machines);});



function get_cookie_name(name) 
<<<<<<< HEAD
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
=======
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
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
<<<<<<< HEAD

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

=======
const decoded=parseJwt(token);
const username=decoded.preferred_username;
const iduser=decoded.sub;
const role=decoded.role_id;
document.getElementById("username").innerText=("   Bonjour "+username+" " );
>>>>>>> 65a5a8b991f357bef5c1b7c74e921613cafb4399
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

document.getElementById("post").action=`/use/create/${paramId}`;