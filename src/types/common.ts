export type Obj = Record<string, any>

export type Id = number

export type WithId<T> = T & { id: Id }

export type Nullable<T> = T | null
