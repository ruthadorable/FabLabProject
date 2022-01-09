const classList = document.getElementById("classList");
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");
let inputDuree,txt;
const token = get_cookie_name("jwt_token");
if(token){
  console.log("ok")
}else{
  const body=document.querySelector("body");
body.remove();
alert("Veillez d'abord vous connecter");
}

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
  
  
    

    const nameCol = document.getElementById("name");
    const nameTxt = document.createTextNode(c.name);
    nameCol.appendChild(nameTxt);


    const imageCol= document.getElementById("image");
    const image = document.createElement("img");
    image.src=c.image;
    image.height=150;
    image.width=250;
    imageCol.appendChild(image);


    const euCol = document.getElementById("tarif");
    var tarif= parseFloat(c.price_minute).toFixed(2);
    const euTxt = document.createTextNode(tarif+" €");
    euCol.appendChild(euTxt);

    const inputDuree=document.getElementById("minutes");
    
    const button = document.getElementById("buttonduree");
    button.onclick=rendertotal;

    function rendertotal(){
    const calculCol = document.getElementById("total");
    var total=parseFloat(c.price_minute*inputDuree.value).toFixed(2);
    calculCol.value=total;    
  }

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
const iduser=decoded.sub;
const username=decoded.preferred_username;
const role=decoded.role_id;

document.getElementById("username").innerHTML=("Bonjour "+username);

fetch(`/equipement/${paramId}`)
  .then((response) => response.json())
  .then((machine) =>
    populateTable(machine)
  );
document.getElementById("form").action=`/membre/utilisation/${paramId}`;