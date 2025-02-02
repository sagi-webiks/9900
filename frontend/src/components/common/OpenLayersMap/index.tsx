import type React from "react";
import { useEffect, useRef } from "react";
import { Map as OLMap, View, type Feature } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature as OLFeature } from "ol";
import "ol/ol.css";
import type { Pixel } from "ol/pixel";
import { InteractionMode } from "@/types";
import { Point } from "ol/geom";

export type OpenLayersMapProps = Partial<{
  center: [number, number];
  zoom: number;
  featuresRef: React.MutableRefObject<Feature[]>;
  mode: InteractionMode;
}>;

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  center = [34.9, 31.5],
  zoom = 8.5,
  featuresRef = { current: [] },
  mode = InteractionMode.View,
}) => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<OLMap | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const mousePositionRef = useRef<HTMLDivElement | null>(null);

  console.log("OpenLayersMap render", featuresRef.current);
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    const tileLayer = new TileLayer({ source: new OSM() });
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new OLMap({
      target: mapDivRef.current,
      layers: [tileLayer, vectorLayer],
      view: new View({ center: fromLonLat(center), zoom }),
      controls: [],
    });

    vectorSource.clear();
    if (featuresRef.current?.length > 0) vectorSource.addFeatures(featuresRef.current);

    if (featuresRef.current?.length === 1) {
      setTimeout(() => {
        const extent = vectorSource.getExtent();
        if (extent) {
          map.getView().animate({ center: extent.slice(0, 2), zoom: 10, duration: 1500 });
        }
      }, 1000);
    }

    const pointerMoveListener = (event) => {
      const pixel: Pixel = event.pixel;
      const feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
      const coords = toLonLat(event.coordinate);

      if (mousePositionRef.current) {
        mousePositionRef.current.innerText = `${coords[0]?.toFixed(8)}, ${coords[1]?.toFixed(8)}`;
      }

      if (feature) {
        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = feature.get("name");
          tooltipRef.current.style.left = `${event.pixel[0] + 10}px`;
          tooltipRef.current.style.top = `${event.pixel[1] - 30}px`;
          tooltipRef.current.style.display = "block";
        }
        mapDivRef.current!.style.cursor = "pointer";
      } else {
        mapDivRef.current!.style.cursor = "";
        if (tooltipRef.current) {
          tooltipRef.current.style.display = "none";
        }
      }
    };

    map.on("pointermove", pointerMoveListener);

    if (mode === InteractionMode.Create || mode === InteractionMode.Edit) {
      map.on("singleclick", (event) => {
        vectorSource.clear();
        const newFeature = new OLFeature({
          geometry: new Point(event.coordinate),
        });

        if (featuresRef?.current?.length > 0) {
          const currFeature = featuresRef.current[0] as OLFeature;
          const { geometry: _, ...featureProperties } = currFeature.getProperties();
          newFeature.setProperties(featureProperties);
          newFeature.setId(currFeature.getId());
          featuresRef.current = [newFeature];
        } else {
          newFeature.set("name", "To do");
          featuresRef.current = [newFeature];
        }

        vectorSource.addFeature(newFeature);
      });
    }

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current?.un("pointermove", pointerMoveListener);
      mapRef.current = null;
    };
  }, [center, zoom, featuresRef, mode]);

  return (
    <>
      <div
        ref={mapDivRef}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "100%", height: "100%" }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "rgba(0, 0, 0, 0.6)",
          color: "#3ECF8E",
          padding: "5px 10px",
          borderRadius: "10px",
          display: "none",
          zIndex: 1000,
        }}
      />
      <div
        ref={mousePositionRef}
        style={{
          position: "absolute",
          width: "200px",
          textAlign: "center",
          bottom: "5px",
          left: "5px",
          background: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "10px",
          fontSize: "12px",
        }}
      >
        {mousePositionRef.current?.innerText || "00.00000000, 00.00000000"}
      </div>
    </>
  );
};

export default OpenLayersMap;
