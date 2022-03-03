/**
 * PROPAGATE FUNCTIONS
 * functions which zoom the map
 */

export function zoom(e) {
    return d3.zoom()
        .scaleExtent([0.25, 100])
        .on("zoom", (event) => {
            let transform = event.transform;
            e.attr("transform", transform.toString());
        });
 }

export function resetZoom(e) {
    const svg = d3.select(e.node().parentElement);
    const zoom = this.zoom(e);

    return svg.transition()
        .duration(700)
        .call(zoom.transform, d3.zoomIdentity);
}
