import { Id } from 'types/common'

const createUniqueId = (): Id => {
  return Math.random() + new Date().getTime()
}

export default createUniqueId
