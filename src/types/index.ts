import React from "react";

export type TPagination = {
  limit: number;
  skip: number;
};

export interface DashboardRoute {
  path: string;
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  children?: DashboardRoute[];
  element: React.ReactNode;
}
