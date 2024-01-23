// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
  

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    let features = data.features;
    
    // Creating a GeoJSON layer with the retrieved data
    let circleLayer = L.geoJson(data, {
        // Define the style for the GeoJSON features
        style: function(features) {
            let color;
            // Determine the color based on a feature's property
            if (features.geometry.coordinates[2] > 90) {
                color = '#ea2c2c';
            } else if (features.geometry.coordinates[2] > 70) {
                color = '#ea822c';
            } else if (features.geometry.coordinates[2] > 50) {
                color = '#ee9c00';
            } else if (features.geometry.coordinates[2] > 30) {
                color = '#eecc00';
            } else if (features.geometry.coordinates[2] > 10) {
                color = '#d4ee00';
            }  else {
                color = '#98ee00';
            }
            return {
                fillColor: color,
                fillOpacity: 0.5,
                color: color,
                weight: 1
            };
        },
     // Add circles to the GeoJSON features
        pointToLayer: function(features, coord) {
        return L.circle(coord, {
            radius: features.properties.mag * 30000, // Set the radius of the circle
        
        // Add pop up to each marker showing location, magnitue and depth of each quake
        }).bindPopup(`<h3>Magnitue: ${features.properties.mag}</h3> 
                    <h3>Depth: ${features.geometry.coordinates[2]}</h3> 
                    <h3>Location: ${features.properties.place}</h3>`)
    }})
    
    // Add the GeoJSON layer to the map
circleLayer.addTo(myMap);

// Add legend

// Set up and position legend
let legend = L.control({
    position: "bottomright"
  });

  // Add legend componenets, depth and color
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through depths and depth text and color.
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
        }
    return div;
    };
  
  // Add the legend to the map
  legend.addTo(myMap);
});  
