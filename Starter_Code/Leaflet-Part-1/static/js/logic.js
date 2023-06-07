const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function createMap(earthquakeData) {
  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const baseMaps = {
    'Street Map': street
  };

  const myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street]
  });

  L.control.layers(baseMaps).addTo(myMap);

  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<i style="background: #00FF00"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: #ADFF2F"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #FFA500"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #FF6347"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #DC143C"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #FF0000"></i><span>90+</span><br>';

    return div;
  };

  legend.addTo(myMap);

  const earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      const color = chooseColor(feature.geometry.coordinates[2]);
      const radius = feature.properties.mag * 2.5;

      return L.circleMarker(latlng, {
        radius: radius,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
      }).bindPopup(`
        <h3>${feature.properties.place}</h3>
        <hr>
        <p>${new Date(feature.properties.time)}</p>
        <hr>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${feature.geometry.coordinates[2]} km</p>
      `);
    }
  });

  earthquakes.addTo(myMap);
}

function chooseColor(depth) {
  if (depth < 10 && depth > -10) return '#00FF00';
  else if (depth >= 10 && depth < 30) return '#ADFF2F';
  else if (depth >= 30 && depth < 50) return '#FFA500';
  else if (depth >= 50 && depth < 70) return '#FF6347';
  else if (depth >= 70 && depth < 90) return '#DC143C';
  else if (depth >= 90) return '#FF0000';
  else return 'white';
}

d3.json(queryUrl)
  .then(function (data) {
    createMap(data.features);
  })
  .catch(function (error) {
    console.log('Error:', error);
  });
