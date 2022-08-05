type Id = number

const createUniqueId = (): Id => {
  return Math.random() + new Date().getTime()
}

export default createUniqueId
