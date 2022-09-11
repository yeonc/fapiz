import { Id, Obj, WithId } from 'types/common'

const getIdsFromArrayOfObjects = (objects: WithId<Obj>[]): Id[] =>
  objects.map(object => object.id)

export default getIdsFromArrayOfObjects
