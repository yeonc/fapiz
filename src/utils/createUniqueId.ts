const createUniqueId = (): number => {
  return Math.random() + new Date().getTime()
}

export default createUniqueId
