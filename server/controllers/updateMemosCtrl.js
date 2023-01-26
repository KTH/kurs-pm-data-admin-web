'use strict'

const { safeGet } = require('safe-utils')
const log = require('@kth/log')
const { getKoppsCourseRoundTerms, getAllCourseCodes, getApplicationFromLadokUID } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')

async function _fetchAllMemosAndUpdateMemoWithApplicationCodes() {
  const courseCodes = await getAllCourseCodes()
  let totalMemosToUpdate = 0
  let totalCoursesFetchedFromKopps = 0
  let totalApplicationCodesFetchedFromKopps = 0
  if (courseCodes && courseCodes.length > 0) {
    totalCoursesFetchedFromKopps = courseCodes.length
    for await (const courseCode of courseCodes) {
      const memoData = await getMemoApiData('getAllMemosByCourseCode', {
        courseCode,
      })
      if (memoData && memoData.length > 0) {
        const { lastTermsInfo } = await getKoppsCourseRoundTerms(courseCode, false)
        if (lastTermsInfo && lastTermsInfo.length > 0) {
          for await (const { ladokRoundIds, semester, applicationCodes, memoEndPoint, _id } of memoData) {
            const lastTermInfo = lastTermsInfo.find(x => x.term.toString() === semester.toString())
            if (lastTermInfo) {
              const { rounds } = lastTermInfo
              for await (const ladokRoundId of ladokRoundIds) {
                const round = rounds.find(x => x.ladokRoundId.toString() === ladokRoundId.toString())
                if (round) {
                  const { ladokUID } = round
                  if (ladokUID && ladokUID !== '') {
                    const { application_code, round_number } = await getApplicationFromLadokUID(ladokUID)
                    totalApplicationCodesFetchedFromKopps++
                    if (round_number.toString() === ladokRoundId.toString()) {
                      const applicationCode = applicationCodes.find(x => x.toString() === application_code.toString())
                      if (!applicationCode) {
                        applicationCodes.push(application_code)
                      }
                    }
                  }
                }
              }
            }
            const apiResponse = await changeMemoApiData(
              'updatedMemoById',
              { _id },
              {
                applicationCodes,
              }
            )
            if (safeGet(() => apiResponse.message)) {
              log.debug('Error from API trying to update a new draft: ', apiResponse.message)
            }
            log.info('New memo draft was created in kurs-pm-data-api for course memo with memoEndPoint:', memoEndPoint)
            totalMemosToUpdate++
          }
        }
      }
    }
    log.debug('All memos have been updated with application codes.', {
      totalApplicationCodesFetchedFromKopps,
      totalCoursesFetchedFromKopps,
      totalMemosToUpdate,
    })
  }
}

module.exports = {
  fetchAllMemosAndUpdateMemoWithApplicationCodes: _fetchAllMemosAndUpdateMemoWithApplicationCodes,
}
