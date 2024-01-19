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
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    
    // Creating a GeoJSON layer with the retrieved data
    let circleLayer = L.geoJson(data, {
        // Define the style for the GeoJSON features
        style: function(features) {
            return {
                fillColor: 'purple',
                fillOpacity: 0.5,
                color: 'black',
                weight: 1
            };
        },
     // Add circles to the GeoJSON features
        pointToLayer: function(features, coord) {
        return L.circle(coord, {
            radius: 1000000, // Set the radius of the circle
        })}})
    
// Add the GeoJSON layer to the map
circleLayer.addTo(myMap)
});
