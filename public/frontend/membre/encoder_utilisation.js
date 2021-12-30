const classList = document.getElementById("classList");
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");
let inputDuree,txt;

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

function populateTable(c) {
  
  
    const row = document.createElement("tr");

    const nameCol = document.createElement("td");
    const nameTxt = document.createTextNode(c.name);
    nameCol.appendChild(nameTxt);
    row.appendChild(nameCol);

    const imageCol= document.createElement("img");
    imageCol.src=c.image;
    row.appendChild(imageCol);


    const euCol = document.createElement("td");
    var tarif= parseFloat(c.price_minute).toFixed(2);
    const euTxt = document.createTextNode(tarif+" €");
    euCol.appendChild(euTxt);
    row.appendChild(euCol);

    inputDuree = document.createElement("input");
    inputDuree.name="minutes"
    inputDuree.type="number";
    inputDuree.value=0;
    row.appendChild(inputDuree);
    
    
    const button = document.createElement("button");
    const innertxt = document.createTextNode("Valider");
    button.type="button";
    button.appendChild(innertxt);
    button.onclick=rendertotal;
    row.appendChild(button);

    function rendertotal(){
    const calculCol = document.createElement("td");
    calculCol.id="total";
    txt=document.createElement("input");
    txt.type="text";
    txt.name="total";
    txt.value=0;
    var total=parseFloat(c.price_minute*inputDuree.value).toFixed(2);
    txt.value=total;
    calculCol.appendChild(txt);
    row.appendChild(calculCol);
  }

  
  const tableBody = classList.querySelector("tbody");
  tableBody.replaceChildren(row);
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
const iduser=decoded.sub;
alert(iduser);
const username=decoded.preferred_username;
document.getElementById("username").innerHTML=("Bonjour "+username);
fetch(`/equipement/${paramId}`)
  .then((response) => response.json())
  .then((machine) =>
    populateTable(machine)
  );

function sendData(){
fetch("/membre/utilisation",{
  method: 'POST',
  body: JSON.stringify({
    iduser: iduser,
    idmachine: paramId,
    minutes: inputDuree.value,
    total: txt.value
  }),
  headers:{
    "Content-type":"application/json; charset=UTF-8"
  }
})
alert("Votre utilisation a bien été encodé!");
}