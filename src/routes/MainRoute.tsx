import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { dashboardRoutes } from "./product.routes";
import routeExtract from "../utils/routeExtract";
import ProductUpdate from "../pages/product/ProductUpdate";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...routeExtract(dashboardRoutes),
      {
        path: "/product/edit/:id",
        element: <ProductUpdate/>
      }
    ],
  },
]);

export default MainRoute;
