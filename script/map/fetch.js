/* fetch map type on given document */
async function json(c, n) {
    const width = c.node().parentElement.clientWidth; // get width + height of svg to calculate scale
    const height = c.node().parentElement.clientHeight;

    const data = await d3.json(n);
    const collection = topojson.feature(data, data.objects.boundaries);

    let projection = d3.geoMercator()
        .scale(calculate.scale(collection, width, height))
        .center(calculate.center(collection))
        .translate([width / 2, height / 2]);
    let path = d3.geoPath().projection(projection);

    let map = c.selectAll("path")
        .data(collection.features)
        .enter().append("path")
            .attr("d", path);

    return map;
}

async function svg(n) {

}

// calculating coordinates to centre maps dynamically
const calculate = {
    scale : function(fc, wd, ht) {
        const path = d3.geoPath().projection(d3.geoMercator().scale(1));

        let bounds = path.bounds(fc); // bounds of map in pixel of screen

        // find scale by finding how many times the screen size is larger than the map bounds
        let scale = 0.95 / Math.max(
            (bounds[1][0] - bounds[0][0]) / wd,//make dynamic
            (bounds[1][1] - bounds[0][1]) / ht
        );

        return scale;
    },

    center : function(fc) { // sets drawing center of map to center of given country, otherwise it would always start pointed at [0ºN, 0ºW]
        const bounds = d3.geoBounds(fc); // bounds of the geographical feature (long, lat)

        let center = [
            (bounds[1][0] + bounds[0][0]) / 2,
            (bounds[1][1] + bounds[0][1]) / 2
        ];

        return center;
    }
}

export {json, svg};


/*
APPENDIX I
notes on d3 bounding box:
    - boounding box is calculated by drawing a rectangle around any given feature in a vector graphic
    - due to the bounding box's shape, it has four corners each with two coordinates with four distinct coordinates in total
    - the bounding box function returns an array of these four coordinates
        * it goes by the format of [[x0, y0], [x1, y1]] where x0 and y0 are the min x and y coordinates, and x1 and y1 are the max x and y coordinates
        * important to note that these coordinates are relative to the top left corner of the svg, so the y would be flipped to what it normally is in mathematics
    - hence x1 - x0 is the width and y1 - y0 is the height
*/
