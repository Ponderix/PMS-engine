/**
 * FETCH FUNCTIONS - (aka "load")
 * fetch maps by map type, JSON or SVG, prcoesses it to inline SVG
 * return d3 selected collection of all districts
 * various functions required to calculate center/transform & handling exceptions
 */

export async function json(e, n) {
    const width = e.node().parentElement.clientWidth;
    const height = e.node().parentElement.clientHeight;

    const data = await d3.json(n);
    const collection = topojson.feature(data, data.objects.boundaries);

    let projection = d3.geoMercator()
        .scale(calcGeoScale(collection, width, height))
        .center(calcGeoCentre(collection))
        .translate([width / 2, height / 2]);
    let path = d3.geoPath().projection(projection);

    let map = e.selectAll("path")
        .data(collection.features)
        .enter().append("path")
            .attr("d", path)
            .html(d => featureName(d));

    return map;
}

export async function svg(e, n) {
    const width = e.node().parentElement.clientWidth;
    const height = e.node().parentElement.clientHeight;

    const data = await d3.xml(n);
    const collection = getPaths(data.documentElement.children);
    // Extra 'g' needed for SVG, otherwise zoom resets centering
    const g = e.append("g").attr("class", "map-path-g")

    let map = g.selectAll("path")
        .data(collection)
        .enter().append("path")
            .attr("transform", (path, i) => nodeAttr("transform", path))
            .attr("d", (path, i) => nodeAttr("d", path));

    g.attr("transform", calcVectorTransform(g, width, height));

    return map;
}


function calcGeoScale(fc, wd, ht) {
    const path = d3.geoPath().projection(d3.geoMercator().scale(1));
    let bounds = path.bounds(fc);
    let scale = 0.95 / Math.max(
        (bounds[1][0] - bounds[0][0]) / wd,
        (bounds[1][1] - bounds[0][1]) / ht
    );

    return scale;
}

function calcGeoCentre(fc) {
    const bounds = d3.geoBounds(fc);
    let center = [
        (bounds[1][0] + bounds[0][0]) / 2,
        (bounds[1][1] + bounds[0][1]) / 2
    ];

    return center;
}

function calcVectorTransform(g, wd, ht) {
    const bounding = g.node().getBBox();
    let scale = 0.95 / Math.max(
        bounding.width / wd,
        bounding.height / ht
    );

    // First origin-g is brought origin-SVG (0, 0),
    // then new origin-g is translated to center-SVG,
    // then g is translated up and down so center-g => center-svg.
    let translate = `translate(
        ${0 - bounding.x * scale + (wd - bounding.width * scale) / 2},
        ${0 - bounding.y * scale + (ht - bounding.height * scale) / 2}
    )`;

    return `${translate} scale(${scale})`
}

// XML: find given attribute of XML node and copy to given SVG path
// e.g certain transform attribute has been applied to path
// loading the coordinates direactly into the SVG without the transform would result in bad maps
// solution is use nodeAttr(); to find the transform attribute of the node and copy it over
function nodeAttr(n, node) {
    let attributes = node.attributes;
    for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].name === n) return attributes[i].nodeValue;
    }
}

function getPaths(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].localName === "path") return arr;
        else if (arr[i].localName === "g") return getPaths(arr[i].children);
    }
}

function featureName(d) {
    let properties = d.properties;
    if (Object.values(properties).length > 0) {
        return `<title>${properties.name}</title>`;
    }
}
