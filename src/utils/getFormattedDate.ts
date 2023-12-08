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

const ONE_SECOND_TO_MILLISECONDS = 1000
const ONE_MINUTE_TO_SECONDS = 60
const ONE_HOUR_TO_MINUTES = 60
const ONE_DAY_TO_HOURS = 24
const convertMillisecondsToDays = (milliseconds: number): Days => {
  const seconds = milliseconds / ONE_SECOND_TO_MILLISECONDS
  const minutes = seconds / ONE_MINUTE_TO_SECONDS
  const hours = minutes / ONE_HOUR_TO_MINUTES
  const days = hours / ONE_DAY_TO_HOURS
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
