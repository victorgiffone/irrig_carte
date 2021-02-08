var wms_layers = [];


    var projection_PlanIGNv2_0 = ol.proj.get('EPSG:3857');
    var projectionExtent_PlanIGNv2_0 = projection_PlanIGNv2_0.getExtent();
    var size_PlanIGNv2_0 = ol.extent.getWidth(projectionExtent_PlanIGNv2_0) / 256;
    var resolutions_PlanIGNv2_0 = new Array(14);
    var matrixIds_PlanIGNv2_0 = new Array(14);
    for (var z = 0; z < 14; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions_PlanIGNv2_0[z] = size_PlanIGNv2_0 / Math.pow(2, z);
        matrixIds_PlanIGNv2_0[z] = z;
    }
    var lyr_PlanIGNv2_0 = new ol.layer.Tile({
                            source: new ol.source.WMTS(({
                              url: "https://wxs.ign.fr/pratique/geoportail/wmts?SERVICE=WMTS&REQUEST=GetCapabilities",
    attributions: ' ',
                                "layer": "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
                                "TILED": "true",
             matrixSet: 'EPSG:3857',
             format: 'image/png',
              projection: projection_PlanIGNv2_0,
              tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent_PlanIGNv2_0),
                resolutions: resolutions_PlanIGNv2_0,
                matrixIds: matrixIds_PlanIGNv2_0
              }),
              style: 'normal',
              wrapX: true,
                                "VERSION": "1.0.0",
                            })),
                            title: "Plan IGN v2",
                            opacity: 1.0,
                            
                            
                          });
var format_noeuds_1 = new ol.format.GeoJSON();
var features_noeuds_1 = format_noeuds_1.readFeatures(json_noeuds_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_noeuds_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_noeuds_1.addFeatures(features_noeuds_1);
var lyr_noeuds_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_noeuds_1, 
                style: style_noeuds_1,
                interactive: true,
                title: '<img src="styles/legend/noeuds_1.png" /> noeuds'
            });

lyr_PlanIGNv2_0.setVisible(true);lyr_noeuds_1.setVisible(true);
var layersList = [lyr_PlanIGNv2_0,lyr_noeuds_1];
lyr_noeuds_1.set('fieldAliases', {'ID': 'ID', 'Name': 'Name', 'Begin': 'Begin', 'End': 'End', 'DLocal': 'DLocal', 'KLocal': 'KLocal', 'HWLocal': 'HWLocal', 'MatPipe': 'MatPipe', 'DPipe': 'DPipe', 'Service': 'Service', 'Sector': 'Sector', 'Com': 'Com', 'Date': 'Date', });
lyr_noeuds_1.set('fieldImages', {'ID': 'Range', 'Name': 'TextEdit', 'Begin': 'TextEdit', 'End': 'TextEdit', 'DLocal': 'TextEdit', 'KLocal': 'TextEdit', 'HWLocal': 'TextEdit', 'MatPipe': 'TextEdit', 'DPipe': 'TextEdit', 'Service': 'TextEdit', 'Sector': 'TextEdit', 'Com': 'TextEdit', 'Date': 'TextEdit', });
lyr_noeuds_1.set('fieldLabels', {'ID': 'no label', 'Name': 'no label', 'Begin': 'no label', 'End': 'no label', 'DLocal': 'no label', 'KLocal': 'no label', 'HWLocal': 'no label', 'MatPipe': 'no label', 'DPipe': 'no label', 'Service': 'no label', 'Sector': 'inline label', 'Com': 'no label', 'Date': 'no label', });
lyr_noeuds_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});