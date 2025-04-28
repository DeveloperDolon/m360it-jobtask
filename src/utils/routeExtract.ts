import { TDashboardRoute } from "../types";

const routeExtract = (routeList: TDashboardRoute[]) => {
  return routeList?.map((route) => {
    return {
      path: route?.path,
      element: route?.element,
    };
  });
};

export default routeExtract;
