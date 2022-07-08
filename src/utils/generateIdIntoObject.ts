import createUniqueId from 'utils/createUniqueId'
import { Object, ObjectWithId } from 'types'

const generateIdIntoObject = (object: Object): ObjectWithId => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default generateIdIntoObject
