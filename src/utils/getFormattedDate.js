import getDaysBetweenTwoDate from 'utils/getDaysBetweenTwoDate'
import getFullDate from 'utils/getFullDate'
import getFullTime from 'utils/getFullTime'

const TWO_WEEKS = 14
const TODAY = 1

const getTodayTime = createdDate => {
  return `오늘 ${getFullTime(createdDate)}`
}

const getRecentDate = daysBetweenCreatedAndToday => {
  return `${daysBetweenCreatedAndToday}일 전`
}

const getFormattedDate = createdDate => {
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
