"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicMenu, getPublicCategories, getProductById } from "../actions/menu.actions";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: getPublicMenu,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getPublicCategories,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
