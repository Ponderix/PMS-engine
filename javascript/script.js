var paths = document.getElementsByTagName("path")
console.log(paths.length)

d3.selectAll("path")
  .style("fill", "#a6a6a6");

//dynamic variables for districts
d3.selectAll("path")
  .attr("id", (p, i) =>{
    return "path" + (i + 1);
  });

//fill paths with colour selected
var colorInput = document.querySelector("#color")
var hexInput = document.querySelector("#hex")

colorInput.addEventListener("input", () =>{
  let colorPicked = colorInput.value
  hexInput.value = colorPicked
})

function pathclick(event) {
  (event.target).style.fill = (colorInput.value)

  //check all paths have certain color
  var tossups = paths.length
  var allPaths = []

  for (var i = 0; i < paths.length; i++) {
    var currentPath = document.getElementById("path" + (i + 1));
    allPaths.push(currentPath)
  }

  var filledPaths = []
  var result = allPaths.filter((e, i) =>{
    return e.style.fill === colorInput.value
  })
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

//dynamic list for Parties results






//to check amount of paths
