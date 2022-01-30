import {drawMap} from "./map/draw.js";
import {dict} from "./map/dict.js";

let random = Object.values(dict)[d3.randomInt(Object.values(dict).length)()];

d3.select("header").html(random.title);
drawMap(d3.select(".container"), random.path);
