import useSWR from 'swr'

const useSnsComments = (query: string) => {
  const { data, error } = useSWR({ url: `/api/sns-comments?${query}` })

  const snsComments = data ? data.data : []

  return { snsComments, isLoading: !data && !error, error }
}

export default useSnsComments
