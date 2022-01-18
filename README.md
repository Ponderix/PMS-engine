# Political Map Simulator

## Naming Conventions
Maps in (assets/maps)[assets/maps] should be named `[Country]_[type-(YEAR)]_(HYP)`. E.g `Germany_Wahlkreise-2021` for a real life map or `Adoria_NationalAssembly_HYP` for a hypothetical map. All fictional countries count as hypothetical. the `[type]` must be in one word, so if the type is multiple words they must be written together like so: `RegionalParliament`.

In the end the name does not really matter, since file paths are defined as shorthand variables in (dict.js)[script/map/dict.js] so they do not have to be written out every time.

## Other Notes
All files in `assets/maps/geojson` must be topojson GeoJSON files.


The main object of the GeoJSON file must be named `boundaries` so it can be accessed through `.data(topojson.feature(data, data.objects.boundaries).features)`.
