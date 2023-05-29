var counter = 0;
var lastClicked;
var lastClickedid;

var minutes = 0;
var seconds = 0;
var intervalId;

window.onload = function() {
   timerElement = document.getElementById('timer');
   seconds = 0;
   intervalId;  
};

const sleep = async (milliseconds) => {
  await new Promise(resolve => {
      return setTimeout(resolve, milliseconds)
  });
};

// Usage:
function freezeWebsite() {
  // Disable user interactions during the freeze
  document.body.style.pointerEvents = 'none';

  setTimeout(function() {
    // Enable user interactions after the freeze
    document.body.style.pointerEvents = 'auto';
  }, 3000);
}


function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  timerElement.textContent = minutes + ' minutes ' + seconds + ' seconds';
}

function startTimer() {
  intervalId = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}


function hidePics() {
  var parent = document.getElementById("row");
  var divs = parent.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var img = div.getElementsByTagName('img')[0];
    div.style.backgroundImage = 'url("icon.jpg")';
    div.style.backgroundSize = 'contain';
    img.style.visibility = 'hidden';
  }

}




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

async function handleButtonClick() {

  var inputs = document.getElementById("inputs");

  var table = document.getElementById("myTable");
  
  var timer = document.getElementById("timerC");

  var name = document.getElementById("name").value.trim();

  document.getElementById("nameC").textContent ="Player name : " + name;

  const strMisson = document.getElementById("mission").value.trim();

  console.log(strMisson);
  if (strMisson > 60) {
    alert("No more than 60 cards please !");
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
for (var i = 0; i < 60 - strMisson; i++) {
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
  timer.style.visibility ='visible';
  await sleep(10000);
  hidePics();
  startTimer(); // Start the timer

 
}




function Correct(image_clicked)
{
  var div1 = document.getElementById(image_clicked);
  if (div1) {
    div1.style.visibility = 'hidden';
  }

  var div2 = document.getElementById(lastClicked + lastClickedid);
  if (div2) {
    div2.style.visibility = 'hidden';
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

async function HandleImageClick(element)
{
  console.log(element.id);

  var string = separateString(element.id);
  var image_id = string[0];
  var image_clicked = string[1];
  
  var parent = document.getElementById(element.id);
  var img = parent.getElementsByTagName('img');

  parent.style.backgroundImage = "none";

  for (var i = 0; i < img.length; i++) {
    img[i].style.visibility = 'visible';
  }

  if(counter == 0)
  {
    lastClicked = image_clicked;
    lastClickedid = image_id;
    counter++;
    return;
  }
  
  freezeWebsite();

  if(counter == 1 && lastClicked == image_clicked && image_id != lastClickedid )
  {
    counter = 0;
    await sleep(3000);
    Correct(element.id);
  }

  if(counter == 1 || image_id != lastClickedid )
  {
    counter = 0;
    lastClicked = "";
    lastClickedid = "";
    await sleep(3000);
    hidePics();
    return;
  }

}