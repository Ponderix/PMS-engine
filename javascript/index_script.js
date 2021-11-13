//MAIN//

//zooming
var svg = d3.select("#adoria")
var g = d3.select("#outlines")

var zoom = d3.zoom()
  .scaleExtent([1, 50])
  .on("zoom", zoomed);

svg.call(zoom).on("dblclick.zoom", null);

function zoomed(event) {
  var transform = event.transform;
  g.attr("transform", transform.toString());
}



//filling paths with color
d3.selectAll("path")
  .style("fill", "#a6a6a6")
  .attr("id", (p, i) =>{
    return "path" + (i + 1);
  });




//showing hex value of selected color
var colorInput = document.querySelector("#color")
var hexInput = document.querySelector("#hex")

colorInput.addEventListener("input", () =>{
  let colorPicked = colorInput.value
  hexInput.value = colorPicked
})



//array of all paths
var paths = document.getElementsByTagName("path")
var allPaths = [];

for (var i = 0; i < paths.length; i++) {
  let currentPath = document.getElementById("path" + (i + 1));
  allPaths.push(currentPath)
}




//onclick events
function appendParty() {
  let party_result = d3.select("#list").append("ul");

      party_result.html((e, i) =>{
        return "test"; //temp
      });

      party_result.append("div")
        .attr("class", "party_flair")
        .style("background-color", colorInput.value);
}

function pathclick(event) {
  (event.target).style.fill = (hexRgb(colorInput.value))

  //adding parties to results box on click according to color
  var party_list = document.getElementById("list");
  var existing_parties = party_list.querySelectorAll("ul");

  console.log();

  if (existing_parties.length != 0) {
    for (var i = 0; i < existing_parties.length; i++) {
      //DOES IT FOR THE ENTIRE LENGTH, CHANGE TO ONLY DOING IT ONCE
      if (existing_parties[i].outerHTML.includes("rgb(0, 0, 0)") != true) {
        appendParty()
      } else {
        return null;
      }
    }
  } else {
    appendParty()
  }



  var filledPaths = allPaths.filter((e, i) =>{ //creates an array with all baths matching colour
    return e.style.fill === "rgb(0, 0, 0)"
  })
  //console.log(filledPaths);

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
