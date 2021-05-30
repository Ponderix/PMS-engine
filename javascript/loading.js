var svgContainer = d3.select("#map")

d3.xml("./assets/adoria.svg")
  .then(function(data) {
    svgContainer.node().append(data.documentElement);
  });
