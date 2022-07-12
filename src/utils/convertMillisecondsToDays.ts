const convertMillisecondsToDays = (milliseconds: any) => {
  const seconds = milliseconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  return days
}

export default convertMillisecondsToDays
