import { stringify } from 'query-string';

export interface IProps {
  bbox: string;
  crs: string;
  filePath: string;
  format: string;
  height: string;
  host: string;
  item: string;
  layers: string;
  request: string;
  service: string;
  styles: string;
  timestamp: string;
  version: string;
  width: string;
}

export default ({
  bbox,
  crs = 'EPSG:3857',
  filePath,
  format = 'image/png',
  height = '1024',
  host,
  item,
  layers = 'dfsu-map',
  request = 'GetMap',
  service = 'WMS',
  styles,
  timestamp,
  version = '1.3.0',
  width = '1024',
}: IProps) => {
  const query = {
    bbox,
    crs,
    filePath,
    format,
    height,
    item,
    layers,
    request,
    service,
    styles,
    timestamp,
    version,
    width,
  };
  const endpoint = host + '/api/maps?' + stringify({ ...query });
  return endpoint;
};
