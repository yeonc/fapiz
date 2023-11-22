import useSWR from 'swr'
import { FashionItemResponse } from 'types/fashion'

const useFashionItems = (query: string) => {
  const { data, error } = useSWR<{ data: FashionItemResponse[] }, Error>({
    url: `/api/fashion-items?${query}`,
  })
  const fashionItems = data ? data.data : []

  return { fashionItems, isLoading: !data && !error, error }
}

export default useFashionItems
