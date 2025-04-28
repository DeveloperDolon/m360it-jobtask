import { DashboardRoute } from "../types";

const routeExtract = (routeList: DashboardRoute[]) => {
  return routeList?.map((route) => {
    return {
      path: route?.path,
      element: route?.element,
    };
  });
};

export default routeExtract;
