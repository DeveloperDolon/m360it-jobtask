import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Overview from "../pages/overview/Overview";
import routeExtract from "../utils/routeExtract";
import productRoutes from "./product.routes";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      ...routeExtract(productRoutes),
    ],
  },
]);

export default MainRoute;
