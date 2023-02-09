'use strict'

const { safeGet } = require('safe-utils')
const log = require('@kth/log')
const { getKoppsCourseRoundTerms, getApplicationFromLadokUID } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')

function _getAllUniqueCourseCodesFromData(data) {
  const courseCodes = []
  data.forEach(({ courseCode }) => {
    const isCourseCodeAlreadyExist = courseCodes.some(x => x === courseCode)
    if (!isCourseCodeAlreadyExist) {
      courseCodes.push(courseCode)
    }
  })
  return courseCodes
}

async function _getCourseRoundTermMap(courseCodes) {
  const courseRoundTermMap = new Map()
  log.info('Total courses to fetch course rounds', courseCodes.length)
  for await (const courseCode of courseCodes) {
    log.info('Fetching course round terms for course: ', courseCode)
    const { lastTermsInfo } = await getKoppsCourseRoundTerms(courseCode, false)
    courseRoundTermMap.set(courseCode, lastTermsInfo)
  }
  return courseRoundTermMap
}

async function _fetchAllMemoFilesAndUpdateWithApplicationCodes() {
  const memoFilesExportMap = {}
  const failedMemoFilesToUpdate = []
  const memoFilesUpdated = []
  const memoFilesWithOutApplicationCodes = []
  const allMemoFiles = await getMemoApiData('getStoredMemoPdfList', null)
  if (allMemoFiles && allMemoFiles.length > 0) {
    const courseCodes = _getAllUniqueCourseCodesFromData(allMemoFiles)
    if (courseCodes && courseCodes.length > 0) {
      try {
        const courseRoundTermsMap = await _getCourseRoundTermMap(courseCodes)
        for await (const memoFile of allMemoFiles) {
          let { applicationCode } = memoFile
          const { _id, courseCode, koppsRoundId, semester } = memoFile
          const lastTermsInfo = courseRoundTermsMap.get(courseCode)
          if (lastTermsInfo && lastTermsInfo.length > 0) {
            const lastTermInfo = lastTermsInfo.find(x => x.term.toString() === semester.toString())
            if (lastTermInfo) {
              const { rounds } = lastTermInfo
              if (rounds) {
                const round = rounds.find(x => x.ladokRoundId.toString() === koppsRoundId.toString())
                if (round) {
                  const { ladokUID } = round
                  if (ladokUID && ladokUID !== '') {
                    try {
                      const { application_code, round_number } = await getApplicationFromLadokUID(ladokUID)
                      if (round_number.toString() === koppsRoundId.toString()) {
                        applicationCode = application_code
                      } else {
                        log.debug('Application code not matched for ', memoFile, { application_code })
                        memoFilesWithOutApplicationCodes.push(memoFile)
                      }
                    } catch (error) {
                      log.error('Error in getting application code of memo file: ', memoFile)
                      memoFilesWithOutApplicationCodes.push(memoFile)
                    }
                  } else {
                    log.debug('LadokUID not found from round:', { round }, { memoFile })
                    memoFilesWithOutApplicationCodes.push(memoFile)
                  }
                } else {
                  log.debug('No round matched', { koppsRoundId })
                  memoFilesWithOutApplicationCodes.push(memoFile)
                }
              } else {
                log.debug('No rounds found for ', { semester }, { courseCode })
                memoFilesWithOutApplicationCodes.push(memoFile)
              }
              try {
                const apiResponse = await changeMemoApiData(
                  'updateStoredPdfMemoWithApplicationCodes',
                  { _id },
                  { applicationCode }
                )
                if (safeGet(() => apiResponse.message)) {
                  log.debug('Error from API trying to update a new memo file: ', apiResponse.message)
                  failedMemoFilesToUpdate.push(memoFile)
                } else {
                  memoFilesUpdated.push(memoFile)
                }
                log.info('New memo file was created in kurs-pm-data-api for course memo with id:', _id)
              } catch (error) {
                log.error('Error in updating memo file ', error)
                failedMemoFilesToUpdate.push(memoFile)
              }
            } else {
              log.debug('Last term info not found for memo file: ', memoFile)
              memoFilesWithOutApplicationCodes.push(memoFile)
            }
          } else {
            log.debug('Terms not found for memo file: ', memoFile)
            memoFilesWithOutApplicationCodes.push(memoFile)
          }
        }
      } catch (error) {
        log.error('Error in preparing memo file object with application code', error)
      }
    } else {
      log.debug('No course codes found from memo files.')
    }
  } else {
    log.debug('No memo files fetched')
  }
  log.info('Total fetced memos files', allMemoFiles.length)
  log.info('Total memo update calls', memoFilesUpdated.length)
  log.info('Total failed memos files', failedMemoFilesToUpdate.length)
  log.info('Total memo files without application codes', memoFilesWithOutApplicationCodes.length)
  if (failedMemoFilesToUpdate.length > 0) {
    memoFilesExportMap['failed_memo_files.csv'] = failedMemoFilesToUpdate
  }
  if (memoFilesWithOutApplicationCodes.length > 0) {
    memoFilesExportMap['memo_files_with_out_application_codes.csv'] = memoFilesWithOutApplicationCodes
  }
  return memoFilesExportMap
}

async function _fetchAllMemosAndUpdateMemoWithApplicationCodes() {
  const memoExportMap = {}
  const failedMemosToUpdate = []
  const memosUpdated = []
  const memosWithOutApplicationCodes = []
  const memoData = await getMemoApiData('getAllMemos', null)
  if (memoData && memoData.length > 0) {
    const courseCodes = _getAllUniqueCourseCodesFromData(memoData)
    if (courseCodes && courseCodes.length > 0) {
      try {
        const courseRoundTermsMap = await _getCourseRoundTermMap(courseCodes)
        for await (const memo of memoData) {
          const { courseCode, ladokRoundIds, semester, applicationCodes, memoEndPoint, status: memoStatus } = memo
          const lastTermsInfo = courseRoundTermsMap.get(courseCode)
          if (lastTermsInfo) {
            const lastTermInfo = lastTermsInfo.find(x => x.term.toString() === semester.toString())
            if (lastTermInfo) {
              const { rounds } = lastTermInfo
              for await (const ladokRoundId of ladokRoundIds) {
                const round = rounds.find(x => x.ladokRoundId.toString() === ladokRoundId.toString())
                if (round) {
                  const { ladokUID } = round
                  if (ladokUID && ladokUID !== '') {
                    try {
                      const { application_code, round_number } = await getApplicationFromLadokUID(ladokUID)
                      if (round_number.toString() === ladokRoundId.toString()) {
                        const applicationCode = applicationCodes.find(x => x.toString() === application_code.toString())
                        if (!applicationCode) {
                          log.info('Applition code pushed to memo: ', { application_code }, memo)
                          applicationCodes.push(application_code)
                        } else {
                          log.debug('Application Code already exist in memo', { applicationCode })
                        }
                      } else {
                        log.debug('Application code not matched for ', memo, { application_code })
                        memosWithOutApplicationCodes.push(memo)
                      }
                    } catch (error) {
                      log.error('Error in getting application code of memo: ', memo)
                      memosWithOutApplicationCodes.push(memo)
                    }
                  } else {
                    log.debug('LadokUID not found from round:', { round }, { memo })
                    memosWithOutApplicationCodes.push(memo)
                  }
                } else {
                  log.debug('No round matched', { ladokRoundId })
                  memosWithOutApplicationCodes.push(memo)
                }
              }
              try {
                const apiResponse = await changeMemoApiData(
                  'updatedMemoWithApplicationCodes',
                  { courseCode, semester, memoEndPoint, status: memoStatus },
                  { applicationCodes, ladokRoundIds }
                )
                if (safeGet(() => apiResponse.message)) {
                  log.info('Error from API trying to update a new draft: ', apiResponse.message)
                  failedMemosToUpdate.push(memo)
                } else {
                  memosUpdated.push(memo)
                  log.info(
                    'New memo draft was created in kurs-pm-data-api for course memo with memoEndPoint:',
                    memoEndPoint
                  )
                }
              } catch (error) {
                log.error('Error in updating memo : ', error)
                failedMemosToUpdate.push(memo)
              }
            } else {
              log.debug('Last term info not found for memo: ', memo)
              memosWithOutApplicationCodes.push(memo)
            }
          } else {
            log.debug('Terms not found for memo : ', memo)
            memosWithOutApplicationCodes.push(memo)
          }
        }
      } catch (error) {
        log.error('Error in preparing memos object with application code', error)
      }
    } else {
      log.debug('No course codes found from memos')
    }
  } else {
    log.debug('No memos fetched')
  }
  log.info('Total fetced memos', memoData.length)
  log.info('Total memos updated', memosUpdated.length)
  log.info('Total failed memos', failedMemosToUpdate.length)
  log.info('Total memo without application codes', memosWithOutApplicationCodes.length)
  if (failedMemosToUpdate.length > 0) {
    memoExportMap['failed_memos.csv'] = failedMemosToUpdate
  }
  if (memosWithOutApplicationCodes.length > 0) {
    memoExportMap['memos_with_out_application_codes.csv'] = memosWithOutApplicationCodes
  }
  return memoExportMap
}

module.exports = {
  fetchAllMemosAndUpdateMemoWithApplicationCodes: _fetchAllMemosAndUpdateMemoWithApplicationCodes,
  fetchAllMemoFilesAndUpdateWithApplicationCodes: _fetchAllMemoFilesAndUpdateWithApplicationCodes,
}
