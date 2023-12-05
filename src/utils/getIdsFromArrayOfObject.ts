import { Id, Obj, WithId } from 'types/common'

const getIdsFromArrayOfObject = (Objects: WithId<Obj>[]): Id[] => {
  return Objects.map(Object => Object.id)
}

export default getIdsFromArrayOfObject
