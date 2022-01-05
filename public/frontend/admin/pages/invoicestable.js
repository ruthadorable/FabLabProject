const list = document.getElementById("list");


function populateTable(classes) {

  const invoiceRows = classes.map((c) => {
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

    const modifCol= document.createElement("td");
    const modifBtn=document.createElement("a");
    modifBtn.href=`/frontend/admin/pages/modif_facture.html?id=${c.id}`;
    const modifTxt = document.createTextNode("Modifier");
    modifBtn.appendChild(modifTxt);
    modifCol.appendChild(modifBtn);
    row.appendChild(modifCol);

    const deleteCol= document.createElement("td");
    const deleteBtn=document.createElement("a");
    deleteBtn.href=`/frontend/admin/pages/supprimer_facture.html?id=${c.id}`;
    const deleteTxt = document.createTextNode("Supprimer");
    deleteBtn.appendChild(deleteTxt);
    deleteCol.appendChild(deleteBtn);
    row.appendChild(deleteCol);


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
document.getElementById("username").innerText=("   Bonjour "+username+" " );

fetch(`/factures`)
  .then((response) => response.json())
  .then((x) => populateTable(x));

