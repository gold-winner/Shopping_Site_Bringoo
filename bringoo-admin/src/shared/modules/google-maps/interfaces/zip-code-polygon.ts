export interface ZipCodePolygon {
  options: google.maps.PolygonOptions;
  zipCode: string;
  multipolygon: google.maps.LatLngLiteral[][][];
}
