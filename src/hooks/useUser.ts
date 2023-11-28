import useSWR from 'swr'
import { UserResponseWithAdditionalFields } from 'types/user'

const useUser = (userId?: number, query?: string) => {
  const { data, error } = useSWR<UserResponseWithAdditionalFields, Error>(
    userId
      ? {
          url: `/api/users/${userId}${query ? `?${query}` : ''}`,
        }
      : null
  )

  if (!userId) {
    return {
      user: null,
      isLoading: false,
      error: null,
    }
  }

  return {
    user: data,
    isLoading: !data && !error,
    error,
  }
}

export default useUser
