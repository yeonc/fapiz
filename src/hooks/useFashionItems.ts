import useSWR from 'swr'
import { FashionItemResponse } from 'types/fashion'

const useFashionItems = (query: string) => {
  const { data, error } = useSWR<{ data: FashionItemResponse[] }, Error>({
    url: `/api/fashion-items?${query}`,
  })

  return {
    fashionItems: data?.data,
    isLoading: !data && !error,
    error,
  }
}

export default useFashionItems
