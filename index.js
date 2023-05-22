var counter = 0;
var lastClicked;
var lastClickedid;




/*
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
*/


function shuffle() {
  var parent = document.getElementById("row");
  var divs = Array.from(parent.getElementsByTagName('div'));

  // Shuffle the array using Fisher-Yates algorithm
  for (var i = divs.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = divs[i];
    divs[i] = divs[j];
    divs[j] = temp;
  }

  // Clear the parent container
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // Append the shuffled divs back to the parent
  for (var i = 0; i < divs.length; i++) {
    parent.appendChild(divs[i]);
  }
}









function separateString(inputString) {
  var numbersString = inputString.replace(/\D/g, '');
  var charsString = inputString.replace(/[0-9]/g, '');
  
  return [numbersString, charsString];
}




function handleButtonClick() {

  var inputs = document.getElementById("inputs");

  var table = document.getElementById("myTable");

  const strMisson = document.getElementById("mission").value.trim();

 

  console.log(strMisson);
  if (strMisson > 30) {
    alert("No more than 30 cards please !");
    return;
  }

  if ( strMisson % 2 != 0) {
    alert("must be an even number of cards please");
    return;
  }

  if (strMisson <= 2) {
    alert("must be more than 2");
    return;
  }
 
// Get all the div elements within the table
var divs = table.querySelectorAll('div');

// Loop to delete the specified number of divs while excluding the specific row
for (var i = 0; i < 30 - strMisson; i++) {
  // Get the current div element
  var div = divs[i];

  // Check if the div belongs to the excluded row
  if (div.id == "row") {
    continue; // Skip to the next iteration if the div is in the excluded row
  }

  // Remove the div element from the table
  div.remove();
}


  shuffle();
  inputs.style.visibility= "hidden";
  table.style.visibility = "visible";

 
}




function Correct(image_clicked)
{
  var div1 = document.getElementById(image_clicked);
  if (div1) {
    div1.remove();
  }

  var div2 = document.getElementById(lastClicked + lastClickedid);
  if (div2) {
    div2.remove();
  }
  
  image_clicked = "";
  lastClicked = "";

  var win = document.getElementById("row");
  if (win) {
    var childDivs = win.querySelectorAll('div');
    if(childDivs.length == 0)
    {
      alert("win"); 
    }
  }

}

function HandleImageClick(element)
{
  console.log(element.id);

  var string = separateString(element.id);
  var image_id = string[0];
  var image_clicked = string[1];
  
  if(counter == 0)
  {
    lastClicked = image_clicked;
    lastClickedid = image_id;
    counter++;
    return;
  }
  
  if(counter == 1 && lastClicked == image_clicked && image_id != lastClickedid )
  {
    counter = 0;
    Correct(element.id);
  }

  if(counter == 1 || image_id != lastClickedid )
  {
    counter = 0;
    lastClicked = "";
    lastClickedid = "";
    return;
  }



}