import { Obj, WithId } from 'types/common'
import getIdsFromArrayOfObject from './getIdsFromArrayOfObject'

type CompareTwoArraysArgs = {
  firstArray: WithId<Obj>[]
  secondArray: WithId<Obj>[]
}

type CompareTwoArrays = (args: CompareTwoArraysArgs) => boolean

const compareTwoArrays: CompareTwoArrays = ({ firstArray, secondArray }) => {
  if (firstArray.length !== secondArray.length) {
    return false
  }

  const firstArrayIds = getIdsFromArrayOfObject(firstArray).sort()
  const secondArrayIds = getIdsFromArrayOfObject(secondArray).sort()

  for (let i = 0; i < firstArrayIds.length; i++) {
    if (firstArrayIds[i] !== secondArrayIds[i]) {
      return false
    }
  }

  return true
}

export default compareTwoArrays
