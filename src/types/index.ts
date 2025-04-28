import React from "react";

export type TPagination = {
  limit: number;
  skip: number;
};

export interface DashboardRoute {
  path: string;
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: DashboardRoute[];
  element: React.ReactNode;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: "In Stock" | "Low Stock" | "Out of Stock";
  dimensions: Dimensions;
  minimumOrderQuantity: number;
  returnPolicy: string;
  shippingInformation: string;
  warrantyInformation: string;
  weight: number;
  tags: string[];
  sku: string;
  meta: Meta;
  reviews: Review[];
}
