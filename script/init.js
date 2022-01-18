import * as load from "./map/fetch.js";
import {pathjson, pathsvg} from "./map/dict.js";

let svg = d3.select("body").append("svg");
let g = svg.append("g");

load.json(g, pathjson.germany);
