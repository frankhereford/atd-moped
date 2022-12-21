import React, { useRef, useCallback, useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
import { Box, makeStyles } from "@material-ui/core";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  createSummaryMapLayers,
  getSummaryMapInteractiveIds,
  MAPBOX_TOKEN,
  countFeatures,
  useHoverLayer,
  useFeatureCollectionToFitBounds,
  basemaps,
  mapConfig,
} from "../../../../utils/mapHelpers";

const ProjectSummaryMap = ({ projectFeatureCollection }) => {
  const mapRef = useRef();
  const featureCount = countFeatures(projectFeatureCollection);

  // TODO:
  // 1. Add project geography to summary query? Or add here so we only fetch once?
  // 2. Update map to use the project
  // 3. Use useZoomToExistingComponents hook to zoom to project geography
  // 4. Update useZoomToExistingComponents to take project geography as a arg instead of data
  // 5. Update map so it has same limitations as the project map (no zooming out past a certain point, etc)

  /**
   * Make use of a custom hook that returns a vector tile layer hover event handler
   * and the details to place and populate a tooltip.
   */
  const { handleLayerHover, featureText, hoveredCoords } = useHoverLayer();

  const [viewport, setViewport] = useState(mapConfig.mapInit);
  /**
   * Make use of a custom hook that fits to a provided feature collection.
   */
  const { fitMapToFeatureCollectionOnRender } = useFeatureCollectionToFitBounds(
    mapRef,
    projectFeatureCollection,
    true,
    100
  );

  /**
   * Updates viewport on zoom, scroll, and other events
   * @param {Object} updatedViewPort - Mapbox object that stores properties of the map view
   */
  const handleViewportChange = useCallback(
    (viewport) =>
      setViewport((prevViewport) => ({ ...prevViewport, ...viewport })),
    [setViewport]
  );

  /**
   * Let's throw an error intentionally if there are no features for a project.
   */
  if (featureCount < 1) {
    // Throw an error if this component was called without features to render.
    throw Error("Map error: Cannot render or edit maps with no features");
  }

  /**
   * If we do have features, proceed to render map.
   */
  return (
    <Box>
      <Map
        /* Current state of viewport */
        {...viewport}
        /* Object reference to this object */
        ref={mapRef}
        maxZoom={20}
        style={{ width: "100%", height: "60vh" }}
        /* Access Key */
        mapboxAccessToken={MAPBOX_TOKEN}
        onRender={fitMapToFeatureCollectionOnRender}
        /* Get the IDs from the layerConfigs object to set as interactive in the summary map */
        /* If specified: Pointer event callbacks will only query the features under the pointer of these layers.
              The getCursor callback will receive isHovering: true when hover over features of these layers */
        interactiveLayerIds={getSummaryMapInteractiveIds(
          projectFeatureCollection
        )}
        /* Gets and sets data from a map feature used to populate and place a tooltip */
        onMouseMove={handleLayerHover}
        /* Updates state of viewport on zoom, scroll, and other events */
        onMove={(e) => handleViewportChange(e.viewState)}
        mapStyle={basemaps.streets}
      >
        {/* Draw Navigation controls with specific styles */}
        <NavigationControl showCompass={false} position="bottom-right" />
        {/*
          If there is GeoJSON data, create sources and layers for
          each source layer in the project's GeoJSON FeatureCollection
        */}
        {projectFeatureCollection &&
          createSummaryMapLayers(projectFeatureCollection)}
      </Map>
    </Box>
  );
};

export default ProjectSummaryMap;
