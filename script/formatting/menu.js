import drawMap from "../map/draw.js";

/**
 * MENU FUNCTIONS
 * functions for constructing menu
 * as well as for menu functionality
 */

function appendItems(arr, c, title) {
    arr.forEach((_, i) => {
        c.append("div")
            .attr("class", "list__item")
            .attr("id", arr[i][0])
            .html(arr[i][1].title)
            .on("click", () =>{
                return this.selectMap(arr[i][1], title);
            });
    });
}

function toggleShow(btn, menu) {
    btn.classed("menu__button--clicked", btn.classed("menu__button--clicked") ? false : true);

    $(menu.node())[0].style.display == "none"?
        $(menu.node()).show("slide", {duration: 700, easing: "easeOutBack"}):
        $(menu.node()).hide("slide", {duration: 700, easing: "easeInBack"});
}

function selectMap(n, title) {
    title.selectAll("div").remove()

    title.append("div")
        .attr("class", "map__title-main")
        .html(n.title);
    title.append("div")
        .attr("class", "map__title-copyright")
        .html(n.copyright);

    drawMap(d3.select(".map__container"), n.path, d3.select(".map__colour-input"));
}

export {appendItems, toggleShow, selectMap};
