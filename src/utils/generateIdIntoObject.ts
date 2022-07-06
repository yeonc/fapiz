import createUniqueId from 'utils/createUniqueId'

const generateIdIntoObject = (object: any) => {
  const id = createUniqueId()

  return {
    id,
    ...object,
  }
}

export default generateIdIntoObject
