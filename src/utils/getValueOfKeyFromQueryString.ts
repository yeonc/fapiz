import { Nullable } from 'types/common'

type Value = Nullable<string>

type GetValueOfKeyFromQueryStringArgs = {
  queryString: string
  key: string
}

const getValueOfKeyFromQueryString = ({
  queryString,
  key,
}: GetValueOfKeyFromQueryStringArgs): Value => {
  const urlQueryParams = new URLSearchParams(queryString)
  const value = urlQueryParams.get(key)
  return value
}

export default getValueOfKeyFromQueryString
