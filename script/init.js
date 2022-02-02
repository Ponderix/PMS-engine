import {drawMap} from "./map/draw.js";
import {dict} from "./map/dict.js";

let map_title_container = d3.select(".map-title");
let random = Object.values(dict)[d3.randomInt(Object.values(dict).length)()];

map_title_container.append("div")
    .attr("class", "map-title__main")
    .html(random.title);

map_title_container.append("div")
    .attr("class", "map-title__copyright")
    .html(random.copyright);

drawMap(d3.select(".map-container"), random.path);
