/* fetch map type on given document */
async function json(e, n) {
    const width = e.node().parentElement.clientWidth;
    const height = e.node().parentElement.clientHeight;

    const data = await d3.json(n);
    const collection = topojson.feature(data, data.objects.boundaries);

    let projection = d3.geoMercator().scale(calculate.scale(collection, width, height))
        .center(calculate.center(collection))
        .translate([width / 2, height / 2]);
    let path = d3.geoPath().projection(projection);

    let map = e.selectAll("path")
        .data(collection.features)
        .enter().append("path")
            .attr("d", path)
            .html(d => name(d));

    return map;
}

async function svg(e, n) {
    const width = e.node().parentElement.clientWidth;
    const height = e.node().parentElement.clientHeight;

    const data = await d3.xml(n);
    const collection = filterXML(data.documentElement.children);
    const g = e.append("g").attr("class", "map-path-g") // needed for SVG, otherwise zoom resets centering transform

    let map = g.selectAll("path")
        .data(collection)
        .enter().append("path")
            .attr("transform", (d, i) => nodeAttr(collection, i, "transform")) // in case some paths have been transformed
            .attr("d", (d, i) => nodeAttr(collection, i, "d"));

    g.attr("transform", calculate.transform(g, width, height));

    return map;
}

export {json, svg};


// various transform calculations
const calculate = {
    scale : function(fc, wd, ht) { // JSON
        const path = d3.geoPath().projection(d3.geoMercator().scale(1));

        let bounds = path.bounds(fc);

        let scale = 0.95 / Math.max(
            (bounds[1][0] - bounds[0][0]) / wd,
            (bounds[1][1] - bounds[0][1]) / ht
        );

        return scale;
    },

    center : function(fc) { // JSON
        const bounds = d3.geoBounds(fc);

        let center = [
            (bounds[1][0] + bounds[0][0]) / 2,
            (bounds[1][1] + bounds[0][1]) / 2
        ];

        return center;
    },

    transform : function(g, wd, ht) { // XML
        const bounding = g.node().getBBox();
        let scale = 0.95 / Math.max(
            bounding.width / wd,
            bounding.height / ht
        );
        let translate = `translate(
            ${0 - bounding.x * scale + (wd - bounding.width * scale) / 2},
            ${0 - bounding.y * scale + (ht - bounding.height * scale) / 2}
        )`; //first origin-g is brought origin-SVG (0, 0), then origin-g is translated to center-SVG and then g is translated up and down so center-g => center-svg

        return `${translate} scale(${scale})`
    }
}

// XML: find given attribute of XML node and copy to given path
function nodeAttr(fc, i, a) {
    let attributes = fc[i].attributes;

    for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].name === a) return attributes[i].nodeValue;
    }
}

// XML: find path nodes in any length of XML structures
function filterXML(arr) {
    let scope = arr;
    for (var i = 0; i < scope.length; i++) {
        if (scope[i].localName === "path") { //check for path node => return array of paths
            return scope;
        } else if (scope[i].localName === "g") { //fail: check for g node => return g node and recurse
            return filterXML(scope[i].children);
        }
    }
}

// JSON: get name of district, return as path title
function name(d) {
    let properties = d.properties;

    if (Object.values(properties).length > 0) {
        return `<title>${properties.name}</title>`;
    }
}
