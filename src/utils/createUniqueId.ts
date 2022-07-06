const createUniqueId = () => {
  return Math.random() + new Date().getTime()
}

export default createUniqueId
