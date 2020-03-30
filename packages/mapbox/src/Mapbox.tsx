import React, { SFC, useEffect, useState, cloneElement } from 'react';
import ReactMapGL, { Source, Layer, FlyToInterpolator } from 'react-map-gl';
import { easeCubicInOut } from 'd3-ease';

import * as Types from './types';

import 'mapbox-gl/dist/mapbox-gl.css';

const commonStyles = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
};

const Mapbox: SFC<Types.Props> = ({
  mapboxApiAccessToken,
  mapInteractions,
  mapPosition,
  mapSource,
  mapStyle,
  mapMarkers = [],
  mapController,
  children,
  onViewPortChange,
  childrenIndex = 1,
  sourceIndex = 2,
  markersIndex = 3,
  ...rest
}) => {
  const hasConfig = !!mapStyle && !!mapboxApiAccessToken;
  const [viewport, setViewport] = useState({});

  const handleOnViewPortChange = (viewportToSet: any) => {
    if (viewportToSet.parentUpdate) {
      onViewPortChange({
        latitude: viewportToSet.latitude,
        longitude: viewportToSet.longitude,
        pitch: viewportToSet.pitch,
        zoom: viewportToSet.zoom,
        bearing: viewportToSet.bearing,
      });
    } else {
      setViewport(viewportToSet);
    }
  };

  useEffect(() => {
    const handleSetViewport = (viewportToSet: Object) =>
      setViewport({
        ...viewportToSet,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubicInOut,
      });
    if (hasConfig) handleSetViewport(mapPosition);
  }, [hasConfig, mapPosition]);

  if (!hasConfig) return null;

  const { collection, layers = [] } = mapSource || {};
  const isSourceVisible = !!collection;

  return (
    <ReactMapGL
      mapStyle={mapStyle}
      mapboxApiAccessToken={mapboxApiAccessToken}
      {...viewport}
      {...mapInteractions}
      controller={mapController}
      width="100%"
      height="100%"
      onViewportChange={handleOnViewPortChange}
      {...rest}
    >
      <div
        style={{ ...commonStyles, position: 'absolute', zIndex: markersIndex }}
      >
        {mapMarkers.map((mapMarker, index) =>
          cloneElement(mapMarker, { key: index }),
        )}
      </div>
      {isSourceVisible && (
        <div
          style={{ ...commonStyles, position: 'absolute', zIndex: sourceIndex }}
        >
          <Source type="geojson" data={collection}>
            {layers.map(layer => (
              <Layer key={layer.id} {...layer} />
            ))}
          </Source>
        </div>
      )}
      <div
        style={{ ...commonStyles, position: 'absolute', zIndex: childrenIndex }}
      >
        {children && children({ viewport })}
      </div>
    </ReactMapGL>
  );
};

export default Mapbox;
