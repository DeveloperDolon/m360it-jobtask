
import {UnorderedListOutlined} from "@ant-design/icons";
import React from "react";
import ProductList from "../pages/product/ProductList";
import { TDashboardRoute } from "../types";


const productRoutes: TDashboardRoute[] = [
    {
        path: "/products",
        label: "Product List",
        icon: UnorderedListOutlined,
        element: React.createElement(ProductList)
    }
]

export default productRoutes;