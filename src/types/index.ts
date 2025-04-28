import { ReactNode } from "react";

export type TPagination = {
  limit: number;
  skip: number;
};

export type TDashboardRoute = {
    path: string;
    label: string;
    icon: React.ElementType;
    element: ReactNode;
}
