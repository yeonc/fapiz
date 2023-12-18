import createUniqueId from 'utils/createUniqueId'
import { WithId } from 'types/common'

const getObjectIncludedId = <T>(object: T): WithId<T> => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default getObjectIncludedId
