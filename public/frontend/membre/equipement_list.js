const classList = document.getElementById("classList");
const token = get_cookie_name("jwt_token");
if(token){
  console.log("ok")
}else{
  const body=document.querySelector("body");
body.remove();
alert("Veillez d'abord vous connecter");
}

function populateTable(classes) {

  const classRows = classes.map((c) => {
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    const nameTxt = document.createTextNode(c.name);
    nameCol.appendChild(nameTxt);
    row.appendChild(nameCol);

    const imageCol= document.createElement("img");
    imageCol.src=c.image;
    imageCol.height=150;  
    imageCol.width=250;
    row.appendChild(imageCol);


    const euCol = document.createElement("td");
    const euTxt = document.createTextNode(c.price_minute+" €");
    euCol.appendChild(euTxt);
    row.appendChild(euCol);

    const teacherCol = document.createElement("td");
    const teacherTxt = document.createTextNode(
      c.reserved
    );
    
    teacherCol.appendChild(teacherTxt);
    row.appendChild(teacherCol);
    
    const button=document.createElement("a");
    const btnTxt=document.createTextNode("Encoder");
    button.appendChild(btnTxt);
    button.class="btn btn-primary"
    button.href=`/frontend/membre/encoder_utilisation.html?id=${c.id}`;
    row.appendChild(button);

    let date1 =new Date();
    let localDate=date1.toLocaleString('fr-FR',{
      weekday: 'long',
      year: 'numeric',
      month:'long',
      day: 'numeric',
      hour:'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    document.getElementById("date").innerHTML="Date : "+localDate;
    
    return row;
  });
  const tableBody = classList.querySelector("tbody");
  tableBody.replaceChildren(...classRows);
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

<<<<<<< HEAD
const token = get_cookie_name("jwt_token");

=======
>>>>>>> 9a919d08b32271ff4c246df75e030a5ad2397443
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
<<<<<<< HEAD
const role=decoded.role_user;

if(token){
  console.log("ok"),
  console.log(token),
  console.log(decoded),
  console.log(role)
  if(role!=2)
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
if(role!=2)
{
const body=document.querySelector("body");
body.remove();
alert("Vous n'avez pas accès à cette page");
}
document.getElementById("username").innerHTML=("   Bonjour "+username+" " );
>>>>>>> 9a919d08b32271ff4c246df75e030a5ad2397443
/*const modifylink=document.getElementById("modifydata");
modifylink.href=`./modification_mesdonnées.html?id=${iduser}`;*/

fetch("/equipement")
  .then((response) => response.json())
  .then((machines) => populateTable(machines));

