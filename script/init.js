import {drawMap} from "./map/draw.js";
import {dict} from "./map/dict.js";

const dict_arr = Object.entries(dict);
const map_title_container = d3.select(".map__title");

//draw random map
let random = dict_arr[d3.randomInt(dict_arr.length)()][1];
mapSelect(map_title_container, random);

//load menu
let menu = d3.select(".menu-body");
let menu_btn = d3.select(".menu-button");
$(menu.node()).hide();

menu_btn.on("click", () =>{
    toggleMenu(menu_btn, menu);
});

d3.select(window).on("keydown", () =>{
    if (event.keyCode == "77") {
        toggleMenu(menu_btn, menu);
    }
});

for (var i = 0; i < dict_arr.length; i++) {
    let menu_li = menu.select(".menu__list")
    menu_li.append("div")
        .attr("class", "list__item")
        .attr("id", dict_arr[i][0])
        .html(dict_arr[i][1].title)
        .on("click", () =>{
            let current = event.target.id;
            return mapSelect(map_title_container, dict[current]);
        });
}

// toggles show/hide menu
function toggleMenu(a, b) { // e has to be d3 selected
    a.classed("--menu-button-clicked", a.classed("--menu-button-clicked", ) ? false : true);

    $(b.node())[0].style.display == "none"?
        $(b.node()).show("slide", {duration: 700, easing: "easeOutBack"}):
        $(b.node()).hide("slide", {duration: 700, easing: "easeInBack"});
}

// draw map according to map selected
function mapSelect(e, n) {
    e.selectAll("div").remove()

    e.append("div")
        .attr("class", "map__title-main")
        .html(n.title);
    e.append("div")
        .attr("class", "map__title-copyright")
        .html(n.copyright);

    drawMap(d3.select(".map__container"), n.path);
}
