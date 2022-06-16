const getFullDate = date => {
  const createdYear = date.getFullYear()
  const createdMonth = date.getMonth() + 1
  const createdDay = date.getDate()
  return `${createdYear}/${createdMonth}/${createdDay}`
}

export default getFullDate
