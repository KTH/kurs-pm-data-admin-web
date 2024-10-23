const ladokCourseRounds = [
  {
    shortName: 'CBIOT2 m.fl.',
    applicationCode: '50748',
    startperiod: { code: 'HT2024', inDigits: '20242' },
    firstTuitionDate: '2024-08-26',
    lastTuitionDate: '2024-10-27',
    state: 'APPROVED',
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
  },
  {
    shortName: 'CDEPR1 m.fl.',
    applicationCode: '51505',
    startperiod: { code: 'HT2024', inDigits: '20242' },
    firstTuitionDate: '2024-08-26',
    lastTuitionDate: '2024-10-27',
    state: 'APPROVED',
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
  },
  {
    shortName: 'CMATD1 m.fl.',
    applicationCode: '61128',
    startperiod: { code: 'VT2024', inDigits: '20241' },
    firstTuitionDate: '2024-03-18',
    lastTuitionDate: '2024-06-03',
    state: 'APPROVED',
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
  },
]

const ladokCourseData = {
  apiError: false,
  statusCode: 200,
  statusText: 'OK',
  versionsnummer: '1',
  kod: 'SF1624',
  benamning: 'Algebra och geometri',
  omfattning: '7.5',
  organisation: {
    id: '',
    code: 'SF',
    name: 'SCI/Matematik',
    organisationTypeName: 'Institution',
  },
  utbildningstyp: {
    id: '22',
    code: '2007GKURS',
    name: 'Kurs, grundnivå',
    creditsUnit: { code: 'HP', sv: 'Högskolepoäng', en: 'Credits' },
    level: { code: '1', name: 'Grundnivå' },
  },
  betygsskala: { id: '131657', code: 'AF', name: 'Sjugradig betygsskala' },
  huvudomraden: [
    { id: '16262', code: 'MAAMK', name: 'Matematik' },
    { id: '16268', code: 'TEKNK', name: 'Teknik' },
  ],
  schoolCode: 'SCI',
}

const groupedLadokCourseRounds = [
  {
    term: '20242',
    rounds: [
      {
        shortName: 'CBIOT2 m.fl.',
        applicationCode: '50748',
        startperiod: { code: 'HT2024', inDigits: '20242' },
        firstTuitionDate: '2024-08-26',
        lastTuitionDate: '2024-10-27',
        state: 'APPROVED',
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
      },
      {
        shortName: 'CDEPR1 m.fl.',
        applicationCode: '51505',
        startperiod: { code: 'HT2024', inDigits: '20242' },
        firstTuitionDate: '2024-08-26',
        lastTuitionDate: '2024-10-27',
        state: 'APPROVED',
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
      },
    ],
  },
  {
    term: '20241',
    rounds: [
      {
        shortName: 'CMATD1 m.fl.',
        applicationCode: '61128',
        startperiod: { code: 'VT2024', inDigits: '20241' },
        firstTuitionDate: '2024-03-18',
        lastTuitionDate: '2024-06-03',
        state: 'APPROVED',
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
      },
    ],
  },
]

const formattedData = {
  course: {
    title: 'Algebra och geometri',
    credits: '7.5',
    creditUnitLabel: { code: 'HP', sv: 'Högskolepoäng', en: 'Credits' },
    creditUnitAbbr: 'hp',
    state: 'ESTABLISHED',
  },
  lastTermsInfo: groupedLadokCourseRounds,
}

module.exports = {
  ladokCourseRounds,
  ladokCourseData,
  groupedLadokCourseRounds,
  formattedData,
}
