const propagate = {
    zoomed : function(g) {
        let transform = event.transform;
        g.attr("transform", transform.toString());
    },

    zoom : d3.zoom().scaleExtent([1, 20]).on("zoom", this.zoomed),

    reset : function() {

    }
}

export {propagate};
