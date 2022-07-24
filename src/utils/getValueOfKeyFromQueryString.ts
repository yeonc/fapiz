import { Nullable } from 'types/common'

type Value = Nullable<string>

type GetValueOfKeyFromQueryStringArgs = {
  queryString: string
  key: string
}

type GetValueOfKeyFromQueryString = (
  args: GetValueOfKeyFromQueryStringArgs
) => Value

const getValueOfKeyFromQueryString: GetValueOfKeyFromQueryString = ({
  queryString,
  key,
}) => {
  const urlQueryParams = new URLSearchParams(queryString)
  const value = urlQueryParams.get(key)
  return value
}

export default getValueOfKeyFromQueryString
