import { useEffect, useRef } from "react";
import OpenLayersMap from "@/components/common/OpenLayersMap";
import { useGetTodos } from "@/hooks/useTodos";
import Loader from "@/components/layout/Loader";
import type { Geometry } from "ol/geom";
import type { Feature } from "ol";

export default function MapPage() {
  const { data, isLoading } = useGetTodos();
  const featuresRef = useRef<Feature<Geometry>[]>([]);

  // Handle loading state
  if (isLoading) {
    return <Loader/>
  }


  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  useEffect(() => {
    if (data) {
      featuresRef.current = data;
    }
  }, [data]);

  return (
    <OpenLayersMap featuresRef={featuresRef} />
  );
}
