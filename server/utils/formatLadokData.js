const formatLadokData = (ladokCourseRounds, ladokCourseData) => {
  const groupedLadokCourseRounds = []
  ladokCourseRounds.forEach(round => {
    if (groupedLadokCourseRounds.length > 0) {
      groupedLadokCourseRounds.forEach(group => {
        if (group.term == round.startperiod.inDigits) {
          group.rounds.push(round)
        } else {
          groupedLadokCourseRounds.push({ term: round.startperiod.inDigits, rounds: [round] })
        }
      })
    } else {
      groupedLadokCourseRounds.push({ term: round.startperiod.inDigits, rounds: [round] })
    }
  })
  // TODO: Need to find a way to handle state instead of hardcoding it
  const ladokCourseRoundTerms = {
    course: {
      title: ladokCourseData.benamning,
      credits: ladokCourseData.omfattning,
      creditUnitLabel: ladokCourseData.utbildningstyp.creditsUnit,
      creditUnitAbbr: ladokCourseData.utbildningstyp.creditsUnit.code.toLowerCase(),
      state: 'ESTABLISHED',
    },
    lastTermsInfo: groupedLadokCourseRounds,
  }
  return ladokCourseRoundTerms
}

module.exports = {
  formatLadokData,
}
