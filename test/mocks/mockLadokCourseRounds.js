const ladokCourseRounds = [
  {
    shortName: 'CBIOT2 m.fl.',
    applicationCode: '50748',
    startperiod: { code: 'HT2024', inDigits: '20242' },
    firstTuitionDate: '2024-08-26',
    lastTuitionDate: '2024-10-27',
    status: 'S3',
    full: true,
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
    userAccessDenied: false,
  },
  {
    shortName: 'CDEPR1 m.fl.',
    applicationCode: '51505',
    startperiod: { code: 'HT2024', inDigits: '20242' },
    firstTuitionDate: '2024-08-26',
    lastTuitionDate: '2024-10-27',
    status: 'S3',
    full: false,
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
    userAccessDenied: false,
  },
  {
    shortName: 'CMATD1 m.fl.',
    applicationCode: '61128',
    startperiod: { code: 'VT2024', inDigits: '20241' },
    firstTuitionDate: '2024-03-18',
    lastTuitionDate: '2024-06-03',
    status: 'S3',
    cancelled: false,
    language: { sv: 'Svenska', en: 'Swedish' },
    campus: { sv: 'KTH Campus', en: 'KTH Campus' },
    userAccessDenied: false,
  },
]

const ladokCourseData = {
  apiError: false,
  statusCode: 200,
  statusText: 'OK',
  versionsnummer: '1',
  kod: 'SF1624',
  status: {
    code: 'S3',
    nameSv: 'Komplett',
    nameEn: 'Complete',
  },
  avvecklad: false,
  benamning: { name: 'Algebra och geometri', nameOther: 'Algebra and Geometry' },
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
  betygsskala: { id: '131657', code: 'AF', name: 'Sjugradig betygsskala', formatted: 'A, B, C, D, E, FX, F' },
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
        status: 'S3',
        full: true,
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
        userAccessDenied: false,
      },
      {
        shortName: 'CDEPR1 m.fl.',
        applicationCode: '51505',
        startperiod: { code: 'HT2024', inDigits: '20242' },
        firstTuitionDate: '2024-08-26',
        lastTuitionDate: '2024-10-27',
        status: 'S3',
        full: false,
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
        userAccessDenied: false,
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
        status: 'S3',
        cancelled: false,
        language: { sv: 'Svenska', en: 'Swedish' },
        campus: { sv: 'KTH Campus', en: 'KTH Campus' },
        userAccessDenied: false,
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
  },
  lastTermsInfo: groupedLadokCourseRounds,
}

module.exports = {
  ladokCourseRounds,
  ladokCourseData,
  groupedLadokCourseRounds,
  formattedData,
}
