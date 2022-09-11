import getIdsFromArrayOfObjects from 'utils/getIdsFromArrayOfObjects'
import { Obj, WithId } from 'types/common'

type CompareTwoArraysArgs = {
  firstArray: WithId<Obj>[]
  secondArray: WithId<Obj>[]
}

type CompareTwoArrays = (args: CompareTwoArraysArgs) => boolean

const compareTwoArrays: CompareTwoArrays = ({ firstArray, secondArray }) => {
  if (firstArray.length !== secondArray.length) {
    return false
  }

  const firstArrayIds = getIdsFromArrayOfObjects(firstArray).sort()
  const secondArrayIds = getIdsFromArrayOfObjects(secondArray).sort()

  for (let i = 0; i < firstArrayIds.length; i++) {
    if (firstArrayIds[i] !== secondArrayIds[i]) {
      return false
    }
  }

  return true
}

export default compareTwoArrays
