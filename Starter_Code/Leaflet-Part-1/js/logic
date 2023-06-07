// Store our API endpoint as queryUrl. API is for all earthquakes in the past 7 days.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to choose marker color based on depth of earthquake
function chooseColor(depth) {
    if (depth < 10 & depth > -10) return "lawngreen";
    else if (depth >= 10 & depth < 30) return "greenyellow";
    else if (depth >= 30 & depth < 50) return "yellow";
    else if (depth >= 50 & depth < 70) return "orange";
    else if (depth >= 70 & depth < 90) return "tomato";
    else if (depth >= 90) return "red";
    else return "white";
  }

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {

  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);

function createFeatures(earthquakeData) {

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  var earthquakes = L.geoJSON(earthquakeData, {

  // Add the circle markers and popups using a pointToLayer
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
    radius: feature.properties.mag*3,
    fillColor: chooseColor(feature.geometry.coordinates[2]),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8     
            
        }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);

  }});

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layer.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street
  };

  // Create an overlay object to hold the overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
  });

  // Create legend and add to map
  // Code adapted from: https://codepen.io/haakseth/pen/KQbjdO
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth of earthquake (in km)</h4>";
  div.innerHTML += '<i style="background: lawngreen"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: greenyellow"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: tomato"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';

  return div;
};

legend.addTo(myMap);

}})