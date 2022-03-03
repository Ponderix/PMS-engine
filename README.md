<h1 align="center">Political Map Simulator Engine</h1>

<p align="center">
    <img src="assets/img/android-chrome-512x512.png" alt="logo" width="120px" height="120px"/>
    <br>
    <i>PMS-engine is a website engine which aims to create a more transparent and dynamic way of making interactive political map websites. Initially intended for the <a href="https://github.com/haroldTheDeveloper/GovMap">GovMap</a> project.
    </i>
    <br>
</p>

<p align="center">
    <a href="DOCUMENTATION.md">Documentation</a>
    ·
    <a href="https://ponderix.github.io/PMS-engine">Preview Website</a>
    <br>
    <br>
</p>

<hr>
This repository and the corresponding website is only supposed to act as quick preview option for the engine. Therefore the styling and formatting of the website is minimal. The main focus of this project is on the loading sequences & interactivity of the maps.

## Naming
### Files
Maps in [assets/maps](assets/maps) should be named `[Country]_[type-(YEAR)]_(HYP)`, the `year` being the last time the map was used in an election. E.g `Germany_Wahlkreise-2021` for a real life map or `Adoria_NationalAssembly_HYP` for a hypothetical map, all fictional countries count as hypothetical. The `[type]` must be written as one word, even if the proper name is two separate words e.g `RegionalParliament`.

### Functions
Function parameters are kept as consistent as possible, here are few of one/two letter parameters which are used throughout the script.

- `c` container, root element of subject
- `e` element, element within a container
- `n` given number or string
- `m` map
- `d` data, used primarily in d3 async functions
- `i` index, for looping
- `fc` feature collection, collection of features or nodes
- `wd, ht, ln` width, height, length

### Styling

BEM naming convention is used, more info [here](https://cssguidelin.es/#bem-like-naming).


## Other Notes
All maps in [assets/maps/geojson](assets/maps/geojson) must be topojson GeoJSON files. Use [mapshaper](https://mapshaper.org/) to convert between filetypes.


The feature collection of all topojson files must be named `boundaries` so it can be parsed by the fetching functions.
```js
// This parses a topojson file and transforms it into a vector graphic
const data = await d3.json(n);
const collection = topojson.feature(data, data.objects.boundaries);
```


An extensive guide to GIS and vector graphics as well as the use of bounding boxes and coordinate systems is provided in [documentation](DOCUMENTATION.md).
