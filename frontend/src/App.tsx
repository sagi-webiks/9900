import MuiProvider from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiProvider>
        <Routes />
        <ToastContainer
          rtl={true}
          theme={"dark"}
          position="bottom-right"
          pauseOnHover={false}
          closeOnClick
        />
      </MuiProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
