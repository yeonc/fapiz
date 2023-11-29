type DateFormattedString = string
type Days = number

const TWO_WEEKS = 14
const TODAY = 1

const getFormattedDate = (createdDate: Date): DateFormattedString => {
  const today = new Date()
  const daysBetweenCreatedAndToday = getDaysBetweenTwoDate(createdDate, today)

  if (daysBetweenCreatedAndToday < TODAY) {
    return getTodayTime(createdDate)
  }

  if (daysBetweenCreatedAndToday < TWO_WEEKS) {
    return getRecentDate(daysBetweenCreatedAndToday)
  }

  return getFullDate(createdDate)
}

export default getFormattedDate

const getDaysBetweenTwoDate = (startDate: Date, endDate: Date): Days => {
  const startMilliseconds = startDate.getTime()
  const endMilliseconds = endDate.getTime()
  const daysBetweenTwoDate = convertMillisecondsToDays(
    endMilliseconds - startMilliseconds
  )
  return Math.floor(daysBetweenTwoDate)
}

const convertMillisecondsToDays = (milliseconds: number): Days => {
  const seconds = milliseconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  return days
}

const getTodayTime = (createdDate: Date): DateFormattedString => {
  return `오늘 ${getFullTime(createdDate)}`
}

const getFullTime = (date: Date): DateFormattedString => {
  const createdHours = date.getHours()
  const createdMinutes = date.getMinutes()
  return `${createdHours}시 ${createdMinutes}분`
}

const getRecentDate = (
  daysBetweenCreatedAndToday: number
): DateFormattedString => {
  return `${daysBetweenCreatedAndToday}일 전`
}

const getFullDate = (date: Date): DateFormattedString => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${month}/${day}`
}
