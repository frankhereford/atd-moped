import React from "react";
import theme from "../../theme/index";

export const MAPBOX_TOKEN = `pk.eyJ1Ijoiam9obmNsYXJ5IiwiYSI6ImNraWV4dHR0ZjAwNnYyd3FwYjFoNHduaDcifQ.--3vRm2KHq1gh5K_L0pqtA`;

export const mapInit = {
  latitude: 30.268039,
  longitude: -97.742828,
  zoom: 12,
};

export const getPolygonId = e =>
  e.features && e.features.length > 0 && e.features[0].properties.polygon_id;

export const getLayerSource = e =>
  e.features && e.features.length > 0 && e.features[0].layer["source-layer"];

export const createProjectLayerConfig = (
  polygonId,
  layerSourceName,
  selectedIds
) => {
  const hoverId = polygonId;
  const layerIds = selectedIds[layerSourceName] || [];

  return {
    id: "location-polygons",
    type: "fill",
    source: {
      type: "vector",
      tiles: [
        "https://tiles.arcgis.com/tiles/0L95CJ0VTaxqcmED/arcgis/rest/services/location_polygons_vector_tiles_w_IDs/VectorTileServer/tile/{z}/{y}/{x}.pbf",
      ],
    },
    "source-layer": layerSourceName,
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "polygon_id"], hoverId],
        theme.palette.map.selected,
        ["in", ["get", "polygon_id"], ["literal", layerIds]],
        theme.palette.primary.main,
        theme.palette.map.transparent,
      ],
      "fill-opacity": 0.4,
    },
  };
};

export const renderTooltip = (hoveredFeature, hoveredCoords, className) => {
  return (
    hoveredFeature && (
      <div
        className={className}
        style={{
          left: hoveredCoords?.x,
          top: hoveredCoords?.y,
        }}
      >
        <div>Polygon ID: {hoveredFeature}</div>
      </div>
    )
  );
};

export const sumFeaturesSelected = selectedIdsObj =>
  Object.values(selectedIdsObj).reduce(
    (acc, selectedIds) => (acc += selectedIds.length),
    0
  );
