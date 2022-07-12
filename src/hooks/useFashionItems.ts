import useSWR from 'swr'

const useFashionItems = (query: any) => {
  const { data, error } = useSWR({ url: `/api/fashion-items?${query}` })

  const fashionItems = data ? data.data : []

  return { fashionItems, isLoading: !data && !error, error }
}

export default useFashionItems
