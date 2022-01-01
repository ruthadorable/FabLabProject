
const classList = document.getElementById("classList");

function populateTable(classes) {

  const classRows = classes.map((c) => {
    const row = document.createElement("tr");

    const dateCol= document.createElement("td");
    const dateformat=c.date.toString().slice(0,10);
    const dateTxt = document.createTextNode(dateformat);
    dateCol.appendChild(dateTxt);
    row.appendChild(dateCol);

    const col2 = document.createElement("td");
    const txt2 = document.createTextNode(c.equipment_name);
    col2.appendChild(txt2);
    row.appendChild(col2);

    const col3 = document.createElement("td");
    const txt3 = document.createTextNode(c.equipment_tarif);
    col3.appendChild(txt3);
    row.appendChild(col3);

    const col4 = document.createElement("td");
    const txt4 = document.createTextNode(c.duration_M);
    col4.appendChild(txt4);
    row.appendChild(col4);

    const amountCol= document.createElement("td");
    const total=parseFloat(c.amount_total).toFixed(2);
    const amountTxt = document.createTextNode(total+"€");
    amountCol.appendChild(amountTxt);
    row.appendChild(amountCol);
    return row;
  });
    const tableBody = classList.querySelector("tbody");
    tableBody.replaceChildren(...classRows);
};
fetch("/getfacture")
  .then((response) => {response.json();console.log(response);})
  .then((facture) => populateTable(facture));

  
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
document.getElementById("username").innerHTML=("   Bonjour "+username+" " );


