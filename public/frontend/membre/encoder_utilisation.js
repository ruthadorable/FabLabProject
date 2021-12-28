const classList = document.getElementById("classList");

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
    const euTxt = document.createTextNode(c.price_minute+" €");
    euCol.appendChild(euTxt);
    row.appendChild(euCol);

    const inputCol = document.createElement("input");
     inputCol.type="number";
     row.appendChild(inputCol);
    
    
    const button=document.createElement("button");
    const btnTxt=document.createTextNode("Encoder");
    button.appendChild(btnTxt);
    button.onclick="encoder()";
    row.appendChild(button);
  
  const tableBody = classList.querySelector("tbody");
  tableBody.replaceChildren(row);
}

fetch("/equipement/1")
  .then((response) => response.json())
  .then((machines) => populateTable(machines));
