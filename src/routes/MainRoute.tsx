import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { dashboardRoutes } from "./product.routes";
import routeExtract from "../utils/routeExtract";


const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...routeExtract(dashboardRoutes),
    ],
  },
]);

export default MainRoute;
