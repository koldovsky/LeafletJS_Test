var map = L.map('map').setView([49.842, 24.032], 17);
	
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	minZoon: 10,
    maxZoom: 19
}).addTo(map);
	
var marker = L.marker([49.842, 24.03165]).addTo(map);
marker.bindPopup("<b>Lviv</b>");
	
map.on('click', function(e) {
    document.getElementById('latlng').innerHTML = e.latlng.lng+ ', ' + e.latlng.lat;
});

function style(feature) {
    return {
        fillColor: '#FD8D3C',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update(layer.feature.properties);
};

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(housesData, {
			style: style,
			onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (house) {
    this._div.innerHTML = '<h4>House info</h4>' +  (house ?
        '<b>' + house.name + '</b><br />' + house.description : "Select house");
};

info.addTo(map);