import * as load from "./fetch.js";
//import {propagate} from "./interactive.js"

// draw map in appropriate containers with suitable format
function drawMap(c, n) {
    const svg = c.append("svg")
        .attr("height", "100%")
        .attr("width", "100%");
    const g = svg.append("g")
        /*.call(propagate.zoom)
        .on("dblclick.zoom", null);*/

    let map;
    if (n.includes(".json")) map = load.json(g, n);
    else map = load.svg(g, n);

    map.then(d => {
        d.attr("class", "map__path")
            .style("stroke-width", () => {
                if (n.includes("Adoria")) return 0 // adoria map already has space between districts
                else return null;
            });
        });
}

export {drawMap};
