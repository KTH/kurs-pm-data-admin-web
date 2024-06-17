const roundIsNotOutdated = checkDate => {
  const dateToCheck = new Date(checkDate)
  if (Number.isNaN(dateToCheck.getTime())) {
    throw new Error('Invalid date')
  }
  const dateToCheckYear = dateToCheck.getFullYear()
  const today = new Date()
  const currentYear = today.getFullYear()

  return dateToCheckYear >= currentYear - 1
}

module.exports = { roundIsNotOutdated }
