const list = document.getElementById("list");
var membre;

function populateTable(invoices) {

  const invoiceRows = invoices.map((c) => {
    const row = document.createElement("tr");
    const numCol = document.createElement("td");
    const numTxt = document.createTextNode(c.num);
    numCol.appendChild(numTxt);
    row.appendChild(numCol);

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

    const detailsCol= document.createElement("td");
    const detailsBtn=document.createElement("a");
    detailsBtn.href=`/frontend/admin/pages/details_facture.html?id=${c.id}`;
    const detailsTxt = document.createTextNode("Voir détails");
    detailsBtn.appendChild(detailsTxt);
    detailsCol.appendChild(detailsBtn);
    row.appendChild(detailsCol);

    fetch(`/user/${c.userId}`)
    .then((response)=>response.json())
    .then((user)=>{
     const userCol = document.createElement("td"); 
     const userTxt=document.createTextNode(user.first_name+" "+user.last_name);
     userCol.appendChild(userTxt);
     row.appendChild(userCol); 
      
      });
    

    

    return row;
  });
  const tableBody = list.querySelector("tbody");
  tableBody.replaceChildren(...invoiceRows);
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

fetch(`/factures`)
  .then((response) => response.json())
  .then((x) => populateTable(x));

<<<<<<< HEAD
=======
}

fetch(`/getuserbyid/${paramId}`)
    .then((response)=>response.json())
    .then((x)=>{
        const user=document.getElementById("user");
        const text=document.createTextNode(x.first_name);
        user.appendChild(text);
    })
>>>>>>> 94a5b7d013d73e3709198cb17ffcd6e06e1c5880
