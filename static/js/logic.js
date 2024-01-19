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
            let colour;
            // Determine the color based on a feature's property
            if (features.geometry.coordinates[2] > 90) {
                colour = 'red';
            } else if (features.geometry.coordinates[2] > 70) {
                colour = 'orange';
            } else if (features.geometry.coordinates[2] > 50) {
                colour = 'yellow';
            } else if (features.geometry.coordinates[2] > 30) {
                colour = 'green';
            } else if (features.geometry.coordinates[2] > 10) {
                colour = 'blue';
            }  else {
                colour = 'violet';
            }
            return {
                fillColor: colour,
                fillOpacity: 0.5,
                color: colour,
                weight: 1
            };
        },
     // Add circles to the GeoJSON features
        pointToLayer: function(features, coord) {
        return L.circle(coord, {
            radius: features.properties.mag * 50000, // Set the radius of the circle
        
        
        })}})
    
// Add the GeoJSON layer to the map
circleLayer.addTo(myMap)
});
