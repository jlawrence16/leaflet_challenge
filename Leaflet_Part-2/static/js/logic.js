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
  
  let linkTectonic = "PB2002_boundaries.json"

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
                color = 'red';
            } else if (features.geometry.coordinates[2] > 70) {
                color = 'orange';
            } else if (features.geometry.coordinates[2] > 50) {
                color = 'yellow';
            } else if (features.geometry.coordinates[2] > 30) {
                color = 'green';
            } else if (features.geometry.coordinates[2] > 10) {
                color = 'blue';
            }  else {
                color = 'violet';
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
        
        
        }).bindPopup(`<h3>Magnitue: ${features.properties.mag}</h3> 
                    <h3>Depth: ${features.geometry.coordinates[2]}</h3> 
                    <h3>Location: ${features.properties.place}</h3>`)
    }})
    
// Add the GeoJSON layer to the map
circleLayer.addTo(myMap);
});

// Add a legend to the map
// Define the legend categories and colors
const legendItems = [
    { label: "90>", color: "#FF0000" },
    { label: "70-90", color: "#FF0000" },
    { label: "50-70", color: "#FF0000" },
    { label: "30-50", color: "#FF0000" },
    { label: "10-30", color: "#FF0000" },
    { label: "<10", color: "#FF0000" }
  ];
  
  // Create the legend element
  const legend = L.control({ position: "bottomright" });
  
  // Define the content of the legend
  legend.onAdd = function(map) {
    const div = L.DomUtil.create("div", "legend");
    
    // Create the legend items
    for (let item of legendItems) {
      const label = item.label;
      const color = item.color;
      
      const marker = L.divIcon({
        className: "legend-marker",
        html: `<div style="background-color: ${color};"></div>`
      });
      
      const listItem = L.DomUtil.create("div", "legend-item");
      listItem.innerHTML = `${marker}<span>${label}</span>`;
      
      div.appendChild(listItem);
    }
    
    return div;
  };
  
  // Add the legend to the map
  legend.addTo(myMap);


// Getting our GeoJSON data for tetonic plates   
  fetch('PB2002_boundaries.json')
    .then(response => response.json())
    .then(data => {
      // Access the GeoJSON data
      const features = data.features;
      // Use the GeoJSON data as needed
      console.log(features);
    })
    .catch(error => {
      console.error('Error:', error);
    });