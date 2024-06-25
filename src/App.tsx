import { Loading, RoutesWithNotFound } from "@/core/components";
import { AuthGuard } from "@/core/guards";
import { store } from "@/core/store/store";
import { theme } from "@/core/theme";
import { ThemeProvider } from "@mui/material";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./core/enums";

const Login = lazy(() => import("@/features/auth/pages/Login"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route
                path={PublicRoutes.START}
                element={<Navigate to={PrivateRoutes.DASHBOARD} />}
              />
              <Route
                path={PublicRoutes.LOGIN}
                element={<Login />}
              />
              <Route element={<AuthGuard />}>
                <Route
                  path={PrivateRoutes.DASHBOARD}
                  element={<Dashboard />}
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </Provider>
  );
}

export default App;
