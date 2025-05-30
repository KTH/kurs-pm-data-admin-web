const { roundIsNotOutdated } = require('../utils-shared/helpers')

const addRoundToGroup = (groupedRounds, round) => {
  const group = groupedRounds.find(roundGroup => roundGroup.term === round.startperiod.inDigits)

  if (group) {
    group.rounds.push(round)
  } else {
    groupedRounds.push({ term: round.startperiod.inDigits, rounds: [round] })
  }
}

const formatLadokData = (ladokCourseRounds, ladokCourseData) => {
  const groupedLadokCourseRounds = []

  ladokCourseRounds.forEach(round => {
    if (!roundIsNotOutdated(round.lastTuitionDate) || round.cancelled) {
      return
    }
    addRoundToGroup(groupedLadokCourseRounds, round)
  })

  const ladokCourseRoundTerms = {
    course: {
      title: ladokCourseData.benamning,
      credits: ladokCourseData.omfattning,
      creditUnitLabel: ladokCourseData.utbildningstyp?.creditsUnit,
      creditUnitAbbr: ladokCourseData.utbildningstyp?.creditsUnit.code.toLowerCase(),
      state: 'ESTABLISHED', // TODO: Handle state dynamically instead of hardcoding it
    },
    lastTermsInfo: groupedLadokCourseRounds,
  }

  return ladokCourseRoundTerms
}

module.exports = {
  formatLadokData,
}
