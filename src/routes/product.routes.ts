import React from "react";
import { PieChartOutlined, ProductOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import Overview from "../pages/overview/Overview";
import ProductList from "../pages/product/ProductList";
import { DashboardRoute } from "../types";

export const dashboardRoutes: DashboardRoute[] = [
  {
    path: "/",
    key: "1",
    label: React.createElement(NavLink, { to: "/" }, "Overview"),
    icon: React.createElement(PieChartOutlined),
    element: React.createElement(Overview),
  },
  {
    path: "/product-list",
    key: "2",
    label: React.createElement(
      NavLink,
      { to: "/product-list" },
      "Product list"
    ),
    icon: React.createElement(ProductOutlined),
    element: React.createElement(ProductList),
  }
];
