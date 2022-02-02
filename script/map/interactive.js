const propagate = {
    zoom : function(e) {
        return d3.zoom()
            .scaleExtent([0.25, 100])
            .on("zoom", (event) => {
                let transform = event.transform;
                e.attr("transform", transform.toString());
            });
    },

    reset : function(e) {

    }
}

export {propagate};
