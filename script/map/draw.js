import * as load from "./fetch.js";
import * as propagate from "./propagate.js";
import fillDistrict, {initLogger} from "./fill.js";

/**
 * DRAW FUNCTION
 * draws map with fetch function,
 * adds styling & configures containers
 */

const exceptions = [
    "Adoria",
    "Hungary"
]

export default function drawMap(c, n, colorInput) {
    let logger = {pressed: false};
    c.selectAll("svg").remove();
    initLogger("f", logger);

    const svg = c.append("svg").attr("height", "100%").attr("width", "100%");
    const g = svg.append("g")
        .on("click", event => fillDistrict(event, colorInput, "map__paint--selected"))
        .on("mouseover", event => {
            if (logger.pressed === true)
            return fillDistrict(event, colorInput, "map__paint--selected");
        });

    svg.call(propagate.zoom(g)).on("dblclick.zoom", null);

    let map;
    n.includes(".json")?
        map = load.json(g, n):
        map = load.svg(g, n);

    map.then(d => applyStyle(d, exceptions, n));
}

function applyStyle(node, ignore, n) {
    return node.attr("class", "map__path").style("stroke-width", () => {
        if (ignore.some(e=>n.includes(e))) return 0;
        else return null;
    });
}
