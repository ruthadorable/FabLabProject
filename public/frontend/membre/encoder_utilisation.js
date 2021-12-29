const classList = document.getElementById("classList");
let url = new URL(window.location.href);
let paramId=url.searchParams.get("id");


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

    const inputDuree = document.createElement("input");
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
    const txt=document.createElement("input");
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


fetch(`/equipement/${paramId}`)
  .then((response) => response.json())
  .then((machine) =>
    populateTable(machine)
  );
