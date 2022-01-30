/* fetch map type on given document */
async function json(e, n) {
    const width = e.node().parentElement.clientWidth;
    const height = e.node().parentElement.clientHeight;

    const data = await d3.json(n);

    const collection = topojson.feature(data, data.objects.boundaries);

    let projection = d3.geoMercator()
        .scale(calculate.scale(collection, width, height))
        .center(calculate.center(collection))
        .translate([width / 2, height / 2]);
    let path = d3.geoPath().projection(projection);

    let map = e.selectAll("path")
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

        let bounds = path.bounds(fc);

        let scale = 0.95 / Math.max(
            (bounds[1][0] - bounds[0][0]) / wd,
            (bounds[1][1] - bounds[0][1]) / ht
        );

        return scale;
    },

    center : function(fc) {
        const bounds = d3.geoBounds(fc);

        let center = [
            (bounds[1][0] + bounds[0][0]) / 2,
            (bounds[1][1] + bounds[0][1]) / 2
        ];

        return center;
    }
}

export {json, svg};
