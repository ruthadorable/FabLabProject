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
document.getElementById("username").innerText=("   Bonjour "+username+" " );


const list = document.getElementById("list");


function populateTable(c) {

 
    const row = document.createElement("tr");

    const numCol = document.createElement("td");
    const numTxt = document.createTextNode(c.id);
    numCol.appendChild(numTxt);
    row.appendChild(numCol);


    const userCol = document.createElement("td");
    const userTxt = document.createTextNode(c.userId);
    userCol.appendChild(userTxt);
    row.appendChild(userCol);

    const dateCol= document.createElement("td");
    const dateformat=c.date.toString().slice(0,10);
    const dateTxt = document.createTextNode(dateformat);
    dateCol.appendChild(dateTxt);
    row.appendChild(dateCol);

    const amountCol= document.createElement("td");
    const total=parseFloat(c.amount_total).toFixed(2);
    const amountTxt = document.createTextNode(total+"€");
    amountCol.appendChild(amountTxt);
    row.appendChild(amountCol);

    


   
  };
fetch(`/facture/${paramId}`)
.then((response) => response.json())
  .then((x) => populateTable(x));