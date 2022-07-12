import createUniqueId from 'utils/createUniqueId'

const generateIdIntoObject = object => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default generateIdIntoObject
