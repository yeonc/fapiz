import createUniqueId from 'utils/createUniqueId'
import { Obj, WithId } from 'types/common'

const generateIdIntoObject = (object: Obj): WithId<Obj> => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default generateIdIntoObject
