/* fetch map type on given document */
async function json(e, n) {
    const path = d3.geoPath().projection(d3.geoMercator());

    let data = await d3.json(n);
    let map = e.selectAll("path")
        .data(topojson.feature(data, data.objects.boundaries).features)
        .enter().append("path")
            .attr("d", path);

    return map;
}

async function svg(n) {

}

export {json, svg};
