const list = document.getElementById("list");
function populateTable(classes) {

    const classRows = classes.map((c) => {
      const row = document.createElement("tr");
  
      const nameCol = document.createElement("td");
      const nameTxt = document.createTextNode(c.name);
      nameCol.appendChild(nameTxt);
      row.appendChild(nameCol);
  
      const imageCol= document.createElement("img");
      imageCol.src="../../"+c.image;
      imageCol.height=150;
      imageCol.width=250;
      row.appendChild(imageCol);
  
      const euCol = document.createElement("td");
      const euTxt = document.createTextNode(c.price_minute+" €");
      euCol.appendChild(euTxt);
      row.appendChild(euCol);



      const modifCol = document.createElement("td");
      const modifBtn = document.createElement("a");
      const modifTxt = document.createTextNode("Modifier");
      modifBtn.class="btn btn-primary"
      modifBtn.appendChild(modifTxt);
      modifBtn.href=`modifier_equipement.html?id=${c.id}`;
      modifCol.appendChild(modifBtn);
      row.appendChild(modifCol);

      
      const deleteCol = document.createElement("td");
      const button=document.createElement("a");
      const btnTxt=document.createTextNode("Supprimer");
      button.appendChild(btnTxt);
      button.class="btn btn-primary"
      button.href=`supprimer_equipement.html?id=${c.id}`;
      deleteCol.appendChild(button);
      row.appendChild(deleteCol);

      
      return row;
    });
    const tableBody = list.querySelector("tbody");
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
fetch("/equipement")
  .then((response) => response.json())
  .then((machines) => populateTable(machines));

