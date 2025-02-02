import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "@/components/layout/Loader";
import DashboardLayout from "@/layouts/DashboardLayout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const MapPage = lazy(() => import("@/pages/MapPage"));

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<HomePage />} /> 
            <Route path="map" element={<MapPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
