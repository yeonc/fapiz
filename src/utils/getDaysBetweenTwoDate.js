import convertMillisecondsToDays from 'utils/convertMillisecondsToDays'

const getDaysBetweenTwoDate = (startDate, endDate) => {
  const startMilliseconds = startDate.getTime()
  const endMilliseconds = endDate.getTime()

  const daysBetweenTwoDate = convertMillisecondsToDays(
    endMilliseconds - startMilliseconds
  )

  return Math.floor(daysBetweenTwoDate)
}

export default getDaysBetweenTwoDate
