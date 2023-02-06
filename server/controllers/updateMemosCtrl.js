'use strict'

const { safeGet } = require('safe-utils')
const log = require('@kth/log')
const { getKoppsCourseRoundTerms, getApplicationFromLadokUID } = require('../koppsApi')
const { getMemoApiData, changeMemoApiData } = require('../kursPmDataApi')

function _exportToCsv(fileName, rows) {
  if (!rows || !rows.length) {
    return
  }
  const separator = ','
  const keys = Object.keys(rows[0])
  const csvData =
    keys.join(separator) +
    '\n' +
    rows
      .map(row =>
        keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k]
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""')
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`
            }
            return cell
          })
          .join(separator)
      )
      .join('\n')

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', fileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

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
  const failedMemoFilesToUpdate = []
  const memoFilesUpdated = []
  const memoFilesWithOutApplicationCodes = []
  const allMemoFiles = await getMemoApiData('getStoredMemoPdfList', null)
  if (allMemoFiles && allMemoFiles.length > 0) {
    const courseCodes = _getAllUniqueCourseCodesFromData(allMemoFiles)
    if (courseCodes && courseCodes.length > 0) {
      const courseRoundTermsMap = await _getCourseRoundTermMap(courseCodes)
      for await (const memoFile of allMemoFiles) {
        let { applicationCode } = memoFile
        const { _id, courseCode, koppsRoundId, semester } = memoFile
        const lastTermsInfo = courseRoundTermsMap.get(courseCode)
        if (lastTermsInfo && lastTermsInfo.length > 0) {
          const lastTermInfo = lastTermsInfo.find(x => x.term.toString() === semester.toString())
          if (lastTermInfo) {
            const { rounds } = lastTermInfo
            const round = rounds.find(x => x.ladokRoundId.toString() === koppsRoundId.toString())
            if (round) {
              const { ladokUID } = round
              if (ladokUID && ladokUID !== '') {
                const { application_code, round_number } = await getApplicationFromLadokUID(ladokUID)
                if (round_number.toString() === koppsRoundId.toString()) {
                  applicationCode = application_code
                }
              }
            }
            const apiResponse = await changeMemoApiData(
              'updateStoredPdfMemoWithApplicationCodes',
              { _id },
              { applicationCode }
            )
            if (safeGet(() => apiResponse.message)) {
              log.info('Error from API trying to update a new memo file: ', apiResponse.message)
              failedMemoFilesToUpdate.push(memoFile)
            } else {
              memoFilesUpdated.push(memoFile)
            }
            log.info('New memo file was created in kurs-pm-data-api for course memo with id:', _id)
          } else {
            memoFilesWithOutApplicationCodes.push(memoFile)
          }
        } else {
          memoFilesWithOutApplicationCodes.push(memoFile)
        }
      }
    }
  }
  log.info('Total fetced memos files', allMemoFiles.length, allMemoFiles)
  log.info('Total memo update calls', memoFilesUpdated.length, memoFilesUpdated)
  log.info('Total failed memos files', failedMemoFilesToUpdate.length, failedMemoFilesToUpdate)
  log.info(
    'Total memo files without application codes',
    memoFilesWithOutApplicationCodes,
    memoFilesWithOutApplicationCodes
  )
  if (failedMemoFilesToUpdate.length > 0) {
    _exportToCsv('failed_memo_files.csv', failedMemoFilesToUpdate)
  }
  if (memoFilesWithOutApplicationCodes.length > 0) {
    _exportToCsv('memo_files_with_out_application_codes.csv', memoFilesWithOutApplicationCodes)
  }
}

async function _fetchAllMemosAndUpdateMemoWithApplicationCodes() {
  const failedMemosToUpdate = []
  const memosUpdated = []
  const memosWithOutApplicationCodes = []
  const memoData = await getMemoApiData('getAllMemos', null)
  if (memoData && memoData.length > 0) {
    const courseCodes = _getAllUniqueCourseCodesFromData(memoData)
    if (courseCodes && courseCodes.length > 0) {
      const courseRoundTermsMap = await _getCourseRoundTermMap(courseCodes)
      for await (const memo of memoData) {
        const { courseCode, ladokRoundIds, semester, applicationCodes, memoEndPoint, status } = memo
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
                  const { application_code, round_number } = await getApplicationFromLadokUID(ladokUID)
                  if (round_number.toString() === ladokRoundId.toString()) {
                    const applicationCode = applicationCodes.find(x => x.toString() === application_code.toString())
                    if (!applicationCode) {
                      applicationCodes.push(application_code)
                    }
                  }
                }
              }
            }
            const apiResponse = await changeMemoApiData(
              'updatedMemoWithApplicationCodes',
              { courseCode, semester, memoEndPoint, status },
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
          } else {
            memosWithOutApplicationCodes.push(memo)
          }
        } else {
          memosWithOutApplicationCodes.push(memo)
        }
      }
    }
  }
  log.info('Total fetced memos', memoData.length, memoData)
  log.info('Total memos updated', memosUpdated.length, memosUpdated)
  log.info('Total failed memos', failedMemosToUpdate.length, failedMemosToUpdate)
  log.info('Total memo without application codes', memosWithOutApplicationCodes, memosWithOutApplicationCodes)
  if (failedMemosToUpdate.length > 0) {
    _exportToCsv('failed_memos.csv', failedMemosToUpdate)
  }
  if (memosWithOutApplicationCodes.length > 0) {
    _exportToCsv('memos_with_out_application_codes.csv', memosWithOutApplicationCodes)
  }
}

module.exports = {
  fetchAllMemosAndUpdateMemoWithApplicationCodes: _fetchAllMemosAndUpdateMemoWithApplicationCodes,
  fetchAllMemoFilesAndUpdateWithApplicationCodes: _fetchAllMemoFilesAndUpdateWithApplicationCodes,
}
