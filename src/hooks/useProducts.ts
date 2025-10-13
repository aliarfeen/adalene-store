import { useQuery } from "@tanstack/react-query"
import apiFactory from "../Api/apiFactory"


interface ProductsListProps {
  activeFilters: {
    category: string
  }
}

const useProducts = ({ activeFilters }: ProductsListProps) => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: apiFactory.fetchProducts,
    staleTime: 1000 * 60 * 2,
  })

return (query.data ?? [])
}

export default useProducts