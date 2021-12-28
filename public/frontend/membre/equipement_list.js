const classList = document.getElementById("classList");

function populateTable(classes) {
  const classRows = classes.map((c) => {
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

    const teacherCol = document.createElement("td");
    const teacherTxt = document.createTextNode(
      c.reserved
    );
    
    teacherCol.appendChild(teacherTxt);
    row.appendChild(teacherCol);
    const button=document.createElement("a");
    const btnTxt=document.createTextNode("Encoder");
    button.appendChild(btnTxt);
    button.href="encoder_utilisation.html";
    row.appendChild(button);
    return row;
  });
  const tableBody = classList.querySelector("tbody");
  tableBody.replaceChildren(...classRows);
}

fetch("/equipement")
  .then((response) => response.json())
  .then((machines) => populateTable(machines));
