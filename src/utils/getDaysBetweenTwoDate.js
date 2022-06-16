import convertMillisecondsToDays from 'utils/convertMillisecondsToDays'

const getDaysBetweenTwoDate = (startDate, endDate) => {
  const startMilliseconds = startDate.getTime()
  const endMilliseconds = endDate.getTime()

  const millisecondsBetweenTwoDate = endMilliseconds - startMilliseconds
  let daysBetweenTwoDate = convertMillisecondsToDays(millisecondsBetweenTwoDate)
  daysBetweenTwoDate = Math.floor(daysBetweenTwoDate)

  return daysBetweenTwoDate
}

export default getDaysBetweenTwoDate
