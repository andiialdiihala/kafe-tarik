import { useQuery } from "@tanstack/react-query";
import { getProductById as getProductDetailById } from "../actions/menu-detail.action";

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductDetailById(id),
    enabled: !!id,
  });
};
