import * as load from "./fetch.js";

// draw map in appropriate containers with suitable format
function drawMap(c, n) {
    const svg = c.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");
    const g = svg.append("g");

    let map = load.json(g, n);

    map.then(d => d.attr("class", "map__path"));
}

export {drawMap};
