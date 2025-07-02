/**
 * Parses a memo endpoint string into its course code, semester, and one or more application codes.
 *
 * Example inputs:
 *   "SF162420252-10276" → { courseCode: 'SF1624', semester: '20252', applicationCodes: ['10276'] }
 *   "SF162420252-10276-50299" → { courseCode: 'SF1624', semester: '20252', applicationCodes: ['10276', '50299'] }
 *   "SFK162420252-10276-50299-77777" → { courseCode: 'SFK1624', semester: '20252', applicationCodes: ['10276', '50299', '77777'] }
 *
 * @param {string} memoEndPoint - A memo endpoint string formatted as "<courseCode><semester>-<applicationCode>[-<applicationCode>...]"
 * @returns {{ courseCode: string, semester: string, applicationCodes: string[] } | undefined}
 *          An object with parsed values, or undefined if the format is invalid.
 */
function parseMemoEndPointString(memoEndPoint) {
  const regex = /^([A-Z0-9]{6,7})(\d{5})-((?:\d{5}-?)+)$/
  const match = memoEndPoint.match(regex)

  if (!match) return undefined

  const [, courseCode, semester, appCodeStr] = match
  const applicationCodes = appCodeStr.split('-')

  return { courseCode, semester, applicationCodes }
}

module.exports = {
  parseMemoEndPointString,
}
