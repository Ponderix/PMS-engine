import * as load from "./fetch.js";
import {pathjson, pathsvg} from "./dict.js";

// draw map in appropriate containers with suitable format
function drawMap(c) {
    let svg = c.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");
    let g = svg.append("g");
    let map = load.json(g, pathjson.germany);

    map.then(d => style(d))
}

// initial styling
function style(m) {
    m.style("fill", "#646464");
    m.style("stroke-width", 1);
    m.style("stroke", "white");
}

export {drawMap};
