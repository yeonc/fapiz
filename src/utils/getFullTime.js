const getFullTime = date => {
  const createdHours = date.getHours()
  const createdMinutes = date.getMinutes()
  return `${createdHours}시 ${createdMinutes}분`
}

export default getFullTime
