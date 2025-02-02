import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import AppBar from "@/components/layout/AppBar";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import Main from "@/components/layout/Main";

import ErrorDialog from "@/components/layout/ErrorDialog";

const DashboardLayout = () => (
  <>
    <AppBar />
    <SidebarNavigation />
    <ErrorBoundary FallbackComponent={ErrorDialog}>
      <Main>
        <Outlet />
      </Main>
    </ErrorBoundary>
  </>
);

export default DashboardLayout;
