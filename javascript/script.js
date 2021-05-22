
//fill paths with colour selected
var colorInput = document.querySelector("#color")
var hexInput = document.querySelector("#hex")

colorInput.addEventListener("input", () =>{
  let colorPicked = colorInput.value
  hexInput.value = colorPicked
})

function pathclick(event) {
  /*(event.target).style.fill = (colorInput.value)*/
}

//to record constituency name on hover and to fill when hover nad f is pressed
var fPressed = false

window.addEventListener("keydown", () =>{
  if (event.keyCode === 70) {
    fPressed = true
    console.log(true)
  } else if (event.keyCode === 67) {
    fPressed = false
    console.log(false)
  }
})

function pathHover() {
  document.getElementById("constName").innerHTML = (event.target.textContent)
  if (fPressed == true) {
    (event.target).style.fill = (colorInput.value)
  }
}

//filling in entire map with certain colour
var pathElements = document.getElementsByTagName("path");

window.addEventListener("keydown", () =>{
  if (event.keyCode === 68) {
    for (var i = 0; i < pathElements.length; i++) {
        pathElements[i].style.fill = (colorInput.value);
    }
  }
})

//dynamic variables for districts


//dynamic list for Parties
var newPartyBtn = document.getElementById("newPartyBtn")
var partyList = document.getElementById("list")
var partyAmount = 0

newPartyBtn.addEventListener("click", () =>{
  var partyDiv = partyList.appendChild(document.createElement("div"));

  partyAmount++

  var colourPickerPartyName = partyDiv.appendChild(document.createElement("input"));
  colourPickerPartyName.setAttribute("type", "text");

  var colourPickerParty = partyDiv.appendChild(document.createElement("input"));
  colourPickerParty.setAttribute("type", "color");

  console.log(partyAmount);

  var colourID = "id" + partyAmount
  colourPickerParty.setAttribute("id", colourID)

  partyColorInput = document.querySelector("#" + colourID)
  console.log(partyColorInput)

  partyColorInput.addEventListener("input", () =>{
    console.log(colourID.value);
  })
})




//counting how many paths with a colour


//to check amount of paths
var tagPaths = document.getElementsByTagName("path")
var amountPaths = console.log(tagPaths.length)
