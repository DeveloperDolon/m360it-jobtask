import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Hello world from home page</h1>,
      },
    ],
  },
]);

export default MainRoute;
