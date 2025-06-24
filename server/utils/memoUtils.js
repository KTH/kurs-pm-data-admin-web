/**
 * Parses a memo endpoint string into its course code, semester, and application code components.
 *
 * Example input: "SF162400202-11111"
 * Output: { courseCode: 'SF1624', semester: '00202', applicationCode: '11111' }
 *
 * @param {string} memoEndPoint - A memo endpoint string, typically formatted as "<courseCode><semester>-<applicationCode>"
 * @returns {{ courseCode: string, semester: string, applicationCode: string } | undefined}
 *          An object with parsed values, or undefined if the format is invalid.
 */
function parseMemoEndPointString(memoEndPoint) {
  const regex = /^([A-Z]{2,3}\d{4})(\d{5})-([^-\s]+)/ // Matches first application code, if many
  const match = memoEndPoint.match(regex)

  if (!match) return undefined

  const [, courseCode, semester, applicationCode] = match
  return { courseCode, semester, applicationCode }
}

module.exports = {
  parseMemoEndPointString,
}
