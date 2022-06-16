import getDaysBetweenTwoDate from './getDaysBetweenTwoDate'
import getFullDate from 'utils/getFullDate'
import getFullTime from 'utils/getFullTime'

const getDateFormat = createdDate => {
  const today = new Date()
  const daysBetweenCreatedAndToday = getDaysBetweenTwoDate(createdDate, today)

  let dateFormat
  if (daysBetweenCreatedAndToday > 14) {
    dateFormat = getFullDate(createdDate)
  } else if (daysBetweenCreatedAndToday < 1) {
    dateFormat = `오늘 ${getFullTime(createdDate)}`
  } else {
    dateFormat = `${daysBetweenCreatedAndToday}일 전`
  }

  return dateFormat
}

export default getDateFormat
