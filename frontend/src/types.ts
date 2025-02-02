export enum GeometryType {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
  MultiPoint = "MultiPoint",
  MultiLineString = "MultiLineString",
  MultiPolygon = "MultiPolygon",
  GeometryCollection = "GeometryCollection",
  Circle = "Circle",
}

export const GeometryTypeHebrewMapper: { [key in GeometryType]: string } = {
  [GeometryType.Point]: "נ''צ",
  [GeometryType.LineString]: "קו",
  [GeometryType.Polygon]: "פוליגון",
  [GeometryType.MultiPoint]: "נקודות ציון",
  [GeometryType.MultiLineString]: "קווים",
  [GeometryType.MultiPolygon]: "פוליגונים",
  [GeometryType.GeometryCollection]: "אוסף גיאומטרי",
  [GeometryType.Circle]: "מעגל",
};


export enum InteractionMode  {
  View = "View",
  Edit = "Edit",
  Create = "Create",
  None = "None",
}

export interface ITodo {
  id?: string;
  geometry: {
    type: string;
    coordinates: [number, number] | [number, number][] | [number, number][][]; 
  };
  properties: Record<string, unknown>;
}