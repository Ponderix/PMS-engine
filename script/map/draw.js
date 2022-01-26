import * as load from "./fetch.js";
import {filepath} from "./dict.js";

// draw map in appropriate containers with suitable format
function drawMap(c) {
    const svg = c.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");
    const g = svg.append("g");

    let map = load.json(g, filepath.germany);

    map.then(d => style(d))
}

// initial styling
function style(m) {
    m.style("fill", "#646464");
    m.style("stroke-width", 0.5);
    m.style("stroke", "white");
}

export {drawMap};
