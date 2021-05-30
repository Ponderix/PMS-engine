//MAIN//

//zooming
var svg = d3.select("#adoria")
var g = d3.select("#outlines")

var zoom = d3.zoom()
  .scaleExtent([1, 50])
  .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
  var transform = event.transform;
  g.attr("transform", transform.toString());
}

//misc path function
var paths = document.getElementsByTagName("path")

d3.selectAll("path")
  .style("fill", "#a6a6a6")
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

//check all paths have certain color
var allPaths = [];

for (var i = 0; i < paths.length; i++) {
  let currentPath = document.getElementById("path" + (i + 1));
  allPaths.push(currentPath)
}


function pathclick(event) {
  (event.target).style.fill = (colorInput.value)

  //adding parties to results box on click according to color
  d3.select("#list")
    .append("ul")
      .html("test")

  var filledPaths = allPaths.filter((e, i) =>{ //creates an array with all baths matching colour
    return e.style.fill === "rgb(0, 0, 0)"
  })
  console.log(filledPaths);

}


//to record constituency name on hover and to fill when hover nad f is pressed
var fPressed = false

window.addEventListener("keydown", () =>{
  if (event.keyCode === 70) {
    fPressed = true
  } else if (event.keyCode === 67) {
    fPressed = false
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
        pathElements[i].style.fill = colorInput.value;
    }
  }
})

//saving and uploading state of map
/* var save = document.getElementById("save_btn");
save.addEventListener("click", () =>{
}); */
