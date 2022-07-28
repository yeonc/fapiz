import { Obj } from 'types/common'

type PaginatedData = Obj[]

type PaginateDataArgs = {
  dataArray: Obj[]
  pageNumber: number
  pageSize: number
}

type PaginateData = (args: PaginateDataArgs) => PaginatedData

const paginateData: PaginateData = ({ dataArray, pageNumber, pageSize }) => {
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = dataArray.slice(startIndex, endIndex)
  return paginatedData
}

export default paginateData
