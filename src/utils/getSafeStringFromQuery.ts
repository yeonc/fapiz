import { Nullable } from 'types/common'

const getSafeStringFromQuery = (
  queryValue: string | string[]
): Nullable<string> => {
  if (typeof queryValue !== 'string') {
    return null
  }

  return queryValue
}

export default getSafeStringFromQuery
