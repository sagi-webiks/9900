import Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { fromLonLat, toLonLat } from "ol/proj";
import type { ITodo } from "@/types";


function featureToJson(feature: Feature<Geometry>): ITodo | null {
  if (!feature || !feature.getGeometry()) return null;

  const geometry = feature.getGeometry();
  let backendGeometry: ITodo["geometry"] | null = null;

  if (geometry instanceof Point) {
    backendGeometry = {
      type: "Point",
      coordinates: toLonLat(geometry.getCoordinates()) as [number, number],
    };
  } else if (geometry instanceof LineString) {
    backendGeometry = {
      type: "LineString",
      coordinates: geometry.getCoordinates().map((coordinate) => toLonLat(coordinate) as [number, number]),
    };
  } else if (geometry instanceof Polygon) {
    backendGeometry = {
      type: "Polygon",
      coordinates: geometry
        .getCoordinates()
        .map((ring) => ring.map((coordinate) => toLonLat(coordinate) as [number, number])),
    };
  } else {
    console.error("Unsupported geometry type");
    return null;
  }
  const { geometry: _, ...featureProperties } = feature.getProperties();
  return {
    id: feature.getId() as string | undefined,
    geometry: backendGeometry,
    properties: featureProperties
  };
}

function jsonToFeature(todo: ITodo): Feature<Geometry> | null {
  if (!todo || !todo.geometry) return null;

  let olGeometry: Geometry | null = null;

  switch (todo.geometry.type) {
    case "Point":
      olGeometry = new Point(fromLonLat(todo.geometry.coordinates as [number, number]));
      break;
    case "LineString":
      olGeometry = new LineString(
        (todo.geometry.coordinates as [number, number][]).map((coordinate) => fromLonLat(coordinate))
      );
      break;
    case "Polygon":
      olGeometry = new Polygon(
        (todo.geometry.coordinates as [number, number][][]).map((ring) =>
          ring.map((coordinate) => fromLonLat(coordinate))
        )
      );
      break;
    default:
      console.error("Unsupported geometry type:", todo.geometry.type);
      return null;
  }

  const feature = new Feature(olGeometry);
  feature.setId(todo.id);
  feature.setProperties(todo.properties);

  return feature;
}

export { featureToJson, jsonToFeature };
