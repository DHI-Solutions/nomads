import { FeatureCollection } from 'geojson';
import { ElementType, ReactNode, ReactElement } from 'react';
import { MapController, ViewportProps } from 'react-map-gl';

export interface MapSource {
  collection?: FeatureCollection;
  layers?: any[];
}

export interface MapPosition {
  latitude: number;
  longitude: number;
  zoom?: number;
  bearing?: number;
  pitch?: number;
  altitude?: number;
  maxZoom?: number;
  minZoom?: number;
  maxPitch?: number;
  minPitch?: number;
}

export interface MapInteractions {
  onHover?: ({ features: [] }: any) => any;
  onClick?: ({ features: [] }: any) => any;
  scrollZoom?: boolean;
  dragPan?: boolean;
  dragRotate?: boolean;
  doubleClickZoom?: boolean;
  touchZoom?: boolean;
  touchRotate?: boolean;
}

export interface Props {
  mapboxApiAccessToken: string;
  mapStyle: string;
  mapPosition: MapPosition;
  mapSource?: MapSource;
  mapController?: MapController;
  mapInteractions?: MapInteractions;
  children?: any;
  mapMarkers?: ReactElement[];
  onViewPortChange?: (viewSet: any) => any;
  childrenIndex?: number;
  sourceIndex?: number;
  markersIndex?: number;
}
