type PaginateDataArgs<T> = {
  dataArray: T[]
  pageNumber: number
  pageSize: number
}

const paginateData = <T>({
  dataArray,
  pageNumber,
  pageSize,
}: PaginateDataArgs<T>): T[] => {
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = dataArray.slice(startIndex, endIndex)
  return paginatedData
}

export default paginateData
