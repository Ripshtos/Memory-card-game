var counter = 0;

function handleOrder() {
  let id1 = this.id;
  let rowIndex = id1[id1.length - 1];
  let direction = id1[0];
  console.log(rowIndex);
  console.log(direction);
  var table = document.getElementById("myTable");

  if (direction == "D") {
    // checks for direction and if the row below exists
    console.log("inside");
    // Get the current row
    var currentRow = table.rows[rowIndex];

    // Get the next row
    var nextRow = table.rows[parseInt(rowIndex) + 1];

    // Check if the next row exists
    if (nextRow != null) {
      console.log("inside2");
      let temp = currentRow.cells[1].textContent;
      console.log(temp);

      currentRow.cells[1].textContent = nextRow.cells[1].textContent;
      nextRow.cells[1].textContent = temp;
    }
  }

  if (direction == "U") {
    // checks for direction and if the row above exists
    console.log("inside");
    // Get the current row
    var currentRow = table.rows[rowIndex];

    // Get the prev row
    var prevRow = table.rows[parseInt(rowIndex) - 1];

    // Check if the next row exists
    if (prevRow != null) {
      console.log("inside2");
      let temp = prevRow.cells[1].textContent;

      console.log(temp);

      prevRow.cells[1].textContent = currentRow.cells[1].textContent;
      currentRow.cells[1].textContent = temp;
    }
  }
}

function handleDelete() {
  let id1 = this.id;
  let rowIndex = id1[id1.length - 1];

  console.log(rowIndex);
  var table = document.getElementById("myTable");
  table.deleteRow(rowIndex);
  counter--;

  for (
    let i = 0;
    i < table.rows.length;
    i++ //updates id's of cells
  ) {
    table.rows[i].cells[0].textContent = i + 1;
    table.rows[i].cells[2].querySelector("button").id = "Delete" + i;
    table.rows[i].cells[3].querySelector("button").id = "Up" + i;
    table.rows[i].cells[4].querySelector("button").id = "Down" + i;
  }
}

function handleButtonClick() {
  var table = document.getElementById("myTable");

  var table = document.getElementById("myTable");
  const strMisson = document.getElementById("mission").value.trim();

  console.log(strMisson);
  if (strMisson.length > 30) {
    alert("Mission title should be less than 30 letters please !");
    return;
  }

  if (strMisson.length == 0) {
    alert("Mission title empty");
    return;
  }

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(counter);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = counter + 1;

  cell2.innerHTML = strMisson;
  cell2.className = "text";
  

  //add first button
  let button = document.createElement("button");
  button.innerText = "Delete";
  button.className = "btn";
  button.onclick = handleDelete;
  button.id = "Delete" + counter;

  cell3.append(button);

  //add second button
  let button2 = document.createElement("button");
  button2.innerText = "Up";
  button2.className = "btn";
  button2.onclick = handleOrder;
  button2.id = "Up" + counter;
  cell4.append(button2);

  //add third button
  let button3 = document.createElement("button");
  button3.innerText = "Down";
  button3.className = "btn";
  button3.onclick = handleOrder;
  button3.id = "Down" + counter;
  cell5.append(button3);

  counter++;
}

function myDeleteFunction() {
  document.getElementById("myTable").deleteRow(0);
}
