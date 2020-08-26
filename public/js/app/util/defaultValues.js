/* eslint-disable import/prefer-default-export */
/* Here are temporary default values for editor's content */
const SCHEDULE_TITLES = {
  0: ['Learning activities', 'Content', 'Preparations'],
  1: ['Läraktivitet', 'Innehåll', 'Förberedelse']
}

const _scheduleDetailsTemplate = (language) => {
  const langIndex = language === 'en' ? 0 : 1
  const header = SCHEDULE_TITLES[langIndex]
    .map(
      (thTitle) => `<th style="width: 33.3333%">${thTitle}
  </th>`
    )
    .join('')

  const emptyRow = `<tr>
    ${'<td style="width: 33.3333%;">&nbsp;</td>'.repeat(3)}
    </tr>`

  const scheduleTable = `<table style="border: 0;">
    <thead><tr>
    ${header}
    </tr></thead>
    <tbody>
    ${emptyRow.repeat(3)}
    </tbody>
    </table>
    `
  return scheduleTable
}

const _scheduleLinks = (url, language) => {
  const english = language === 'en'
  const scheduleName = english ? 'Schedule' : 'Schema'
  if (!url) return ''
  const urls = Array.isArray(url) ? url : [url]
  const uniqueUrls = urls.filter((value, index, self) => self.indexOf(value) === index)
  const uniqueRounds = uniqueUrls.map((urlStr) => urlStr.split('/')[7].toUpperCase())
  return uniqueUrls
    .map((uniqueUrl, index) =>
      uniqueUrl
        ? `<br/><a title="${scheduleName}" href="${uniqueUrl}">${scheduleName} ${uniqueRounds[index]}</a>`
        : ''
    )
    .join('')
}

export const combineScheduleValues = (schemaUrls, memoLangAbbr) => {
  return schemaUrls && schemaUrls.length > 0
    ? `${_scheduleDetailsTemplate(memoLangAbbr)}<p>${_scheduleLinks(schemaUrls)}</p>`
    : `${_scheduleDetailsTemplate(memoLangAbbr)}`
}
