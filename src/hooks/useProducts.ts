import { useQuery } from "@tanstack/react-query";
import apiFactory from "../Api/apiFactory";

const useProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: apiFactory.fetchProducts,
    staleTime: 1000 * 60 * 2, // cache for 2 minutes
  });

  return {
    products: data ?? [],
    isLoading,
    isError,
  };
};

export default useProducts;
