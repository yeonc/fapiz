export default function createUrlQuery(data) {
  const searchParams = new URLSearchParams(data)
  const query = searchParams.toString()
  return query
}
