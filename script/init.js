import {dict} from "./map/dict.js";
import * as menu from "./formatting/menu.js"

const dict_arr = Object.entries(dict);
const map_title_container = d3.select(".map__title");

// Draw random map
let random = dict_arr[d3.randomInt(dict_arr.length)()][1];
menu.selectMap(random, map_title_container);

// Load menu
let menu_body = d3.select(".menu__body");
let menu_btn = d3.select(".menu__button");
$(menu_body.node()).hide();

menu.appendItems(dict_arr, d3.select(".menu__list"), map_title_container);

menu_btn.on("click", () =>{
    menu.toggleShow(menu_btn, menu_body);
});

d3.select(window).on("keydown", () =>{
    if (event.key == "m") {
        menu.toggleShow(menu_btn, menu_body);
    }
});

// Load color input
let color_select = d3.select(".map__paint");
color_select.on("click", () =>{
    color_select.classed("map__paint--selected", color_select.classed("map__paint--selected") ? false : true);
});
