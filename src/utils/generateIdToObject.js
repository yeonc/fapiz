import createUniqueId from 'utils/createUniqueId'

const generateIdToObject = object => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default generateIdToObject
