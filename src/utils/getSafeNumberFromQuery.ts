import { Nullable } from 'types/common'

const getSafeNumberFromQuery = (
  queryValue: string | string[]
): Nullable<number> => {
  if (typeof queryValue !== 'string') {
    return null
  }

  const numberFromQueryValue = Number(queryValue)
  if (isNaN(numberFromQueryValue)) {
    return null
  }

  return numberFromQueryValue
}

export default getSafeNumberFromQuery
