/**
 * INTERACTIVE FUNCTIONS
 * functions which deal with filling in districts as well as counting districts
 */

export default function fillDistrict(event, colorInput, activeClass) {
    let colorInputParent = d3.select(colorInput.node().parentElement);
    if (colorInputParent.classed(activeClass) == true)
        return event.target.style.fill = colorInput.node().value;
}

// Initiat logger to log state of specified "key" on pressed,
// logger updates an "obj" every time key is pressed,
// depending on the state of the logger functiosn can be executed.
// For example, fill district on hover AND key "f" pressed => use logger
// to log state of "f" key.
export function initLogger(key, obj) {
    for (var state in obj) {
        d3.select("body")
            .on("keydown", event => {
                if (event.key == key) return obj[state] = true;
                else return obj[state] = false;
            })
            .on("keyup", event => {
                if (event.key == key) return obj[state] = false;
                else return obj[state] = true;
            });
        break;
    }
}
