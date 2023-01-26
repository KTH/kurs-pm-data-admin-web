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
          for await (const { ladokRoundIds, semester, applicationCodes, memoEndPoint } of memoData) {
            for await (const { rounds, term } of lastTermsInfo) {
              if (semester.toString() === term.toString()) {
                for await (const ladokRoundId of ladokRoundIds) {
                  const round = rounds.find(x => x.ladokRoundId.toString() === ladokRoundId.toString())
                  if (round) {
                    const { ladokUID } = round
                    if (ladokUID && ladokUID !== '') {
                      if (courseCode === 'SF1626' && ladokRoundId === '7' && semester === '20211') {
                        log.info('Check')
                      }
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
            }
            const apiResponse = await changeMemoApiData(
              'updatedMemoById',
              { memoEndPoint, courseCode, semester },
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
