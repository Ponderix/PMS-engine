# Documentation
Documentation regarding various topics such as the engine code, use of libraries and technical concepts.
* [Map Types](#map)
* [d3.js Bounding Boxes](#bounding)

## Map Types <a name="map"></a>
This project makes use of two distinct map filetypes. Although they both end up as inline SVGs once the initial loading sequence is complete, they start off as two wildly different filetypes.

### SVG (Vectors)
SVG stands for Scalable Vector Graphic, it is the standard digital filetype used for vector graphics. What is a vector graphic, you may ask? A vector graphic is a type of image file which, unlike .jpegs or .pngs, is not made out of individual coloured pixels to generate a given image, but rather a set of coordinates and commands which tell the computer between which points to draw lines. This means when zooming into a vector graphic the image quality never degrades, hence "scalable", since all drawing is done relitave to certain points on the plane on not absolutely. Each distinct line or shape made with a set of points is called a "path". In the SVGs used in this project each electoral district is one path.

<img src="assets/img/1200px-VectorBitmapExample.svg.png" margin="10px" height="250px"> <img src="assets/img/polygon.png" align="left" margin="10px" height="200px">

SVGs are written in XML, a language similar to HTML. This means that to load SVG maps, all the code has to do is to read the SVG file and copy the code over to the HTML document. A significant disadvantage to SVGs is that it is hard to make the dynamic, that being able to perform actions such as changing the geographical projection of the map or dynamically appending place names to each district as can be done with topojson/GeoJSON.

Most election maps you see on wikipedia are SVGs.

SVGs can be opened and edited using Inkscape, it is important to note that editing SVGs is very different to editing simple images - there is a steep learning curve involved.

### GeoJSON / topojson (Geographical Coordinates)

## Bounding Boxes <a name="bounding"></a>

### The Concept

### Geographical vs Planar

### Use in this Project
