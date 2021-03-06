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

const list = document.getElementById("list");
function populateTable(users) {

    const userRows = users.map((c) => {
      const row = document.createElement("tr");
  
      const first_nameCol = document.createElement("td");
      const first_nameTxt = document.createTextNode(c.first_name);
      first_nameCol.appendChild(first_nameTxt);
      row.appendChild(first_nameCol);

      const last_nameCol = document.createElement("td");
      const last_nameTxt = document.createTextNode(c.last_name);
      last_nameCol.appendChild(last_nameTxt);
      row.appendChild(last_nameCol);
  
      const emailCol = document.createElement("td");
      const emailTxt = document.createTextNode(c.email);
      emailCol.appendChild (emailTxt);
      row.appendChild( emailCol);;
  
      
      const roleCol = document.createElement("td"); 
      const roleTxt = document.createTextNode(c.role_id==1?"Admin":c.role_id==2?"Membre":"Comptable");
      roleCol.appendChild (roleTxt);
      row.appendChild( roleCol);

      const useCol = document.createElement("td");
      const useBtn = document.createElement("a");
      const useTxt = document.createTextNode("Encoder");
      useBtn.user="btn btn-primary"
      useBtn.appendChild(useTxt);
      useBtn.href=`encoder_utilisation.html?id=${c.id}`;
      useCol.appendChild(useBtn);
      row.appendChild(useCol);

      const modifCol = document.createElement("td");
      const modifBtn = document.createElement("a");
      const modifTxt = document.createTextNode("Modifier");
      modifBtn.user="btn btn-primary"
      modifBtn.appendChild(modifTxt);
      modifBtn.href=`modifier_user.html?id=${c.id}`;
      modifCol.appendChild(modifBtn);
      row.appendChild(modifCol);

      const Col = document.createElement("td");
      const button=document.createElement("a");
      const btnTxt=document.createTextNode("Voir utilisations");
      button.appendChild(btnTxt);
      button.user="btn btn-primary"
      button.href=`uses_by_user.html?id=${c.id}`;
      Col.appendChild(button);
      row.appendChild(Col);

      const invoiceCol = document.createElement("td");
      const invoicebutton=document.createElement("a");
      const invoicebtnTxt=document.createTextNode("Voir factures");
      invoicebutton.appendChild(invoicebtnTxt);
      invoicebutton.user="btn btn-primary"
      invoicebutton.href=`invoices_by_user.html?id=${c.id}`;
      invoiceCol.appendChild(invoicebutton);
      row.appendChild(invoiceCol);

      
      return row;
    });
    const tableBody = list.querySelector("tbody");
    tableBody.replaceChildren(...userRows);
  }
fetch("/users")
  .then((response) => response.json())
  .then((users) => populateTable(users));