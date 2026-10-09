"use client";

import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "../actions/home.actions";

export const useTopSelling = () => {
  return useQuery({
    queryKey: ["top-selling"],
    queryFn: getTopSellingProducts,
  });
};
