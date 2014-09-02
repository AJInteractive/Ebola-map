var map = L.map('map', {
    // center: [9.318990192397917,  -8.2177734375],
    //center: [10.746969318460001, -0.6591796875],
    center: [10.833305983642491, -3.779296875],
    // zoom: 6,
    zoom: 5,
    maxZoom: 7,
    scrollWheelZoom: false
});

var tiles = L.tileLayer.provider('Esri.OceanBasemap');
tiles.addTo(map);

function onEachFeature(feature, layer) {
    var name = feature.properties.NAME_2;
    if (!name) name = feature.properties.NAME_1;
    if (!name) name = feature.properties.NAME_ENGLI;
    if (!name) name = feature.properties.name;

    if (labels[name]) {
        name +=  '<br>' + labels[name];
    }
    layer.bindPopup(name);
}


function loadFeatureCollection (map, featureCollection, style, skipLabel) {
    L.geoJson(featureCollection, {
        style: function(feature) {
            
            var name = feature.properties.NAME_2;
            if (!name) name = feature.properties.NAME_1;
            if (!name) name = feature.properties.NAME_ENGLI;
            if (!name) name = feature.properties.name;

            if (data[name] && data[name] != -1) {
                return {
                    "color": (data[name] == 2)?"#ff0000":"#ff7800",
                    "weight": 1,
                    "opacity": 0.85,
                    "fillOpacity": .45,
                    "fillColor": (data[name] == 2)?"#ff0000":"#ff7800"
                };
            }
            return style;
        },
        onEachFeature: onEachFeature//skipLabel?(function(){}):onEachFeature
    }).addTo(map); 
}

var defaultStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.5,
    "fillOpacity": 0,
    "fillColor": '#ff0000'
};

var defaultStyle2 = {
    "color": "#0000ff",
    "weight": 1,
    "opacity": .4,
    "fillOpacity": .2,
    "fillColor": '#0000ff'
};


var miniStyle = {
    "color": "#ff7800",
    "weight": 0,
    "opacity": 0,
    "fillOpacity": 0,
    "fillColor": '#ff0000'
};

var miniStyle2 = {
    "color": "#0000ff",
    "weight": 1,
    "opacity": 1,
    "fillOpacity": .8,
    "fillColor": '#0000ff'
};

var miniMap = new L.Control.MiniMap(L.tileLayer.provider('Esri.OceanBasemap'), {
    toggleDisplay: false,
    zoomLevelFixed: 1,
    position: 'topright',
    width: 220,
    height: 135
}).addTo(map);


var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var html = ''
    + '<p><span class="confirmed"> </span> Confirmed or probable cases</p>'
    + '<p><span class="suspect"> </span> Suspect cases</p>'
    + '<p><span class="historical"> </span> Historical cases (country level)</p>'
    + '';
    div.innerHTML = html;
    return div;
};

legend.addTo(map);

var data = {};
var labels = {};


Tabletop.init({
    key: '1jyQrKbX-6jWbrxMgBCZWnnmo38Js3vXI9rWgWirWQH0',
    callback: function(sheet, tabletop) {
        console.log(sheet);
        for (var i = 0; i < sheet.length; i++) {
            var row = sheet[i];
            data[row.feature] = row.code;
            labels[row.feature] = row.label;
        }

        loadFeatureCollection(map, GIN, defaultStyle);
        loadFeatureCollection(map, LBR, defaultStyle);
        loadFeatureCollection(map, SLE, defaultStyle);
        loadFeatureCollection(map, NGA, defaultStyle);
        loadFeatureCollection(map, SEN, defaultStyle);
        //Port Harcourt
        loadFeatureCollection(map, NGA2, defaultStyle);

        loadFeatureCollection(miniMap._miniMap, GIN, miniStyle, true);
        loadFeatureCollection(miniMap._miniMap, LBR, miniStyle, true);
        loadFeatureCollection(miniMap._miniMap, SLE, miniStyle, true);
        loadFeatureCollection(miniMap._miniMap, NGA, miniStyle, true);
        loadFeatureCollection(miniMap._miniMap, SEN, miniStyle, true);
        loadFeatureCollection(miniMap._miniMap, NGA2, miniStyle, true);

        loadFeatureCollection(map, CIV, defaultStyle2);
        loadFeatureCollection(map, COD, defaultStyle2);
        loadFeatureCollection(map, COG, defaultStyle2);
        loadFeatureCollection(map, GAB, defaultStyle2);
        loadFeatureCollection(map, UGA, defaultStyle2);
        loadFeatureCollection(map, ZAF, defaultStyle2);
        loadFeatureCollection(map, SSD, defaultStyle2);


        loadFeatureCollection(miniMap._miniMap, CIV, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, COD, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, COG, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, GAB, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, UGA, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, ZAF, miniStyle2, true);
        loadFeatureCollection(miniMap._miniMap, SSD, miniStyle2, true);
    },
    simpleSheet: true
});


