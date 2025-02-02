import { atom, useAtom } from "jotai";
import type { Feature } from "ol";

const featuresAtom = atom<Feature[]>([]);

export function useMapFeatures() {
  const [features, setFeatures] = useAtom(featuresAtom);

  return {
    features,
    setFeatures,
  };
}
