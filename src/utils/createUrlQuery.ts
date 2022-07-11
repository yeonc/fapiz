const createUrlQuery = (data: any) => {
  const searchParams = new URLSearchParams(data)
  const query = searchParams.toString()
  return query
}

export default createUrlQuery
