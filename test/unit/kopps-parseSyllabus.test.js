const { parseSyllabus } = require('../../server/koppsApi')
const { mergeAllData } = require('../../server/controllers/memoCtrl')

jest.mock('../../server/configuration', () => ({
  server: {
    koppsApi: { defaultTimeout: 0 },
    logging: { log: { level: 'info' } },
    proxyPrefixPath: {},
    session: { options: { sessionOptions: { secret: '' } } },
  },
}))
jest.mock('../../server/api', () => {})
jest.mock('../../server/server', () => ({
  getPaths: () => [],
}))
jest.mock('../../server/ladokApi', () => ({}))

const courseML1616 = {
  course: {
    courseCode: 'ML1616',
    departmentCode: 'ML',
    department: {
      code: 'ML',
      name: 'ITM/Hållbar produktionsutveckling',
    },
    educationalLevelCode: 'BASIC',
    gradeScaleCode: 'AF',
    title: 'Industriell projektledning och projektstyrning',
    credits: 7.5,
    creditUnitLabel: 'Högskolepoäng',
    creditUnitAbbr: 'hp',
    courseLiterature: '<p>Meddelas vid kursstart.</p>',
  },
  roundInfos: [
    {
      round: {
        startTerm: {
          term: '20222',
        },
      },
      schemaUrl: 'https://www.kth.se/social/course/ML1616/subgroup/ht-2022-tiips-7/calendar/',
    },
    {
      round: {
        startTerm: {
          term: '20222',
        },
      },
      schemaUrl: 'https://www.kth.se/social/course/ML1616/subgroup/ht-2022-tiips-2/calendar/',
    },
  ],
  mainSubjects: ['Teknik'],
  examinationSets: {
    20192: {
      startingTerm: {
        term: 20192,
      },
      examinationRounds: [
        {
          examCode: 'INL1',
          title: 'Inlämningsuppgifter',
          gradeScaleCode: 'AF',
          credits: 3.5,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '5d53561f-d06f-11e8-8cab-6df6a8314b2c',
        },
        {
          examCode: 'TEN1',
          title: 'Skriftlig tentamen',
          gradeScaleCode: 'AF',
          credits: 4,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '71c6eef2-d06f-11e8-8cab-6df6a8314b2c',
        },
      ],
    },
    20222: {
      startingTerm: {
        term: 20222,
      },
      examinationRounds: [
        {
          examCode: 'INL1',
          title: 'Inlämningsuppgifter',
          gradeScaleCode: 'AF',
          credits: 3.5,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '5d53561f-d06f-11e8-8cab-6df6a8314b2c',
        },
        {
          examCode: 'KON1',
          title: 'Kontrollskrivning',
          gradeScaleCode: 'PF',
          credits: 1,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: 'fe4f701d-c09d-11ec-b81f-5bb105fe4960',
        },
        {
          examCode: 'KON2',
          title: 'Kontrollskrivning',
          gradeScaleCode: 'PF',
          credits: 1,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '1253a551-c09e-11ec-b81f-5bb105fe4960',
        },
        {
          examCode: 'KON3',
          title: 'Kontrollskrivning',
          gradeScaleCode: 'PF',
          credits: 1,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '25550fa7-c09e-11ec-b81f-5bb105fe4960',
        },
        {
          examCode: 'KON4',
          title: 'Kontrollskrivning',
          gradeScaleCode: 'PF',
          credits: 1,
          creditUnitLabel: 'Högskolepoäng',
          creditUnitAbbr: 'hp',
          ladokUID: '478c5e6f-c09e-11ec-b81f-5bb105fe4960',
        },
        {
          examCode: 'TENA',
          title: 'Hemtentamen',
          gradeScaleCode: 'AF',
          // missing credits
          ladokUID: '77efea1c-c09e-11ec-b81f-5bb105fe4960',
        },
        {
          // empty exam
        },
      ],
    },
  },
  publicSyllabusVersions: [
    {
      edition: 3,
      validFromTerm: {
        term: 20222,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
        goals:
          '<p>Efter godk&#228;nd kurs ska studenten kunna:</p><p>1.&#160; &#160; &#160; identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>2.&#160;&#160;&#160;&#160;&#160; f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>3.&#160;&#160;&#160;&#160;&#160; skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll</p><p>4.&#160;&#160;&#160;&#160;&#160; identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning</p><p>5.&#160;&#160;&#160;&#160;&#160; redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning</p><p>F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>6.&#160;&#160;&#160;&#160;&#160; visa kompetens f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver</p><p>7.&#160;&#160;&#160;&#160;&#160;&#160; agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>8.&#160;&#160;&#160;&#160;&#160; implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>9.&#160;&#160;&#160;&#160;&#160;&#160; utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>',
        content:
          '<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>',
        eligibility:
          '<p>S&#228;rskild beh&#246;righet: Godk&#228;nt i kurserna ML1608, ML1609 och ML1610 eller motsvarande.</p>',
        examComments:
          'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p><p>TENA &#228;r ett valfritt examinationsmoment f&#246;r att uppn&#229; h&#246;gre betyg &#228;n E p&#229; kursen.</p>',
        reqsForFinalGrade:
          '<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>',
        establishment:
          '<p>Skolchef vid ITM-skolan har 2022-04-12 beslutat att fastst&#228;lla denna kursplan att g&#228;lla fr&#229;n och med HT 2022 (diarienummer M-2022-0414).</p>',
        languageOfInstruction: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
        ethicalApproach:
          '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
        courseSyllabusVersionValidFromTerm: {
          term: 20222,
        },
      },
    },
    {
      edition: 4,
      validFromTerm: {
        term: 20192,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
        goals:
          '<p>Efter avklarad kurs skall studenten f&#246;r betyg E kunna:</p><p>&#8226;&#160;&#160; &#160;identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll<br />&#8226;&#160;&#160; &#160;identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning<br />&#8226;&#160;&#160; &#160;redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning<br />F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>&#8226;&#160;&#160; &#160;visa kompentes f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver<br />&#8226;&#160;&#160; &#160;agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>',
        content:
          '<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>',
        eligibility:
          '<p>S&#228;rskild beh&#246;righet: Godk&#228;nt i kurserna ML1608, ML1609 och ML1610 eller motsvarande.</p>',
        examComments:
          'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p>',
        reqsForFinalGrade:
          '<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>',
        establishment: '<p>Kursplan f&#246;r ML1616 g&#228;ller fr&#229;n och med HT19</p>',
        languageOfInstruction: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
        ethicalApproach:
          '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
        courseSyllabusVersionValidFromTerm: {
          term: 20192,
        },
      },
    },
  ],
  socialCoursePageUrl: 'https://www.kth.se/social/course/ML1616/',
  formattedGradeScales: {
    AF: 'A, B, C, D, E, FX, F',
    PF: 'P, F',
  },
}
const ladokMockData = {
  omfattning: '7.5',
  benamning: 'Algebra och Geometri',
  huvudomraden: [{ name: 'Matematik' }, { name: 'Teknik' }],
  organisation: {
    name: '',
  },
  utbildningstyp: {
    id: '',
  },
  betygsskala: { code: 'AF', formatted: 'A, B, C, D, E, FX, F' },
}

const combinedExamInfo = {
  examination:
    '<p><ul><li>TEN1 - Tentamen, 7.5 credits, Grading scale: AF</li></ul></p><p>Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.<p>The examiner decides, in consultation with KTHs Coordinator of students with disabilities (Funka), about any customized examination for students with documented, lasting disability.&#160;</p></p>',
  examinationModules: '<h4>TEN1 - Tentamen, 7.5 credits</h4>',
}
const apiMemoDataMock = {}

test('parse an older syllabus 20192 information for 20212 without breaking if TENAs exam credits are missing', () => {
  const foundSyllabus = parseSyllabus(courseML1616, '20212')
  expect(foundSyllabus.syllabusValid.validFromTerm).toBe(20192)
  expect(foundSyllabus).toMatchInlineSnapshot(`
{
  "additionalRegulations": "",
  "courseContent": "<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>",
  "creditUnitAbbr": "hp",
  "equipmentTemplate": "",
  "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
  "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p>",
  "learningOutcomes": "<p>Efter avklarad kurs skall studenten f&#246;r betyg E kunna:</p><p>&#8226;&#160;&#160; &#160;identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll<br />&#8226;&#160;&#160; &#160;identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning<br />&#8226;&#160;&#160; &#160;redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning<br />F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>&#8226;&#160;&#160; &#160;visa kompentes f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver<br />&#8226;&#160;&#160; &#160;agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>",
  "literatureTemplate": "<p>Meddelas vid kursstart.</p>",
  "otherRequirementsForFinalGrade": "<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>",
  "permanentDisability": "<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  <p><a href="https://www.kth.se/student/stod/studier/funktionsnedsattning/funka">Funka- stöd för studenter med funktionsnedsättningar</a></p>",
  "possibilityToAdditionTemplate": "",
  "possibilityToCompletionTemplate": "",
  "recruitmentText": "",
  "syllabusValid": {
    "validFromTerm": 20192,
    "validUntilTerm": 20221,
  },
}
`)
})

// 20222

test('parse the latest syllabus 20222 for 20222', async () => {
  const mergedData = await mergeAllData(courseML1616, ladokMockData, apiMemoDataMock, combinedExamInfo)
  expect(mergedData.credits).toBe('7.5')

  // expect(foundSyllabus).toMatchInlineSnapshot(`
  //   {
  //     "additionalRegulations": "",
  //     "courseContent": "<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>",
  //     "courseMainSubjects": "Teknik",
  //     "creditUnitAbbr": "hp",
  //     "credits": 7.5,
  //     "departmentName": "ITM/Hållbar produktionsutveckling",
  //     "educationalTypeId": null,
  //     "equipmentTemplate": "",
  //     "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
  //     "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p><p>TENA &#228;r ett valfritt examinationsmoment f&#246;r att uppn&#229; h&#246;gre betyg &#228;n E p&#229; kursen.</p>",
  //     "examination": "<p><ul><li>INL1 - Inlämningsuppgifter, 3,5 hp, Betygsskala: A, B, C, D, E, FX, F</li><li>KON1 - Kontrollskrivning, 1,0 hp, Betygsskala: P, F</li><li>KON2 - Kontrollskrivning, 1,0 hp, Betygsskala: P, F</li><li>KON3 - Kontrollskrivning, 1,0 hp, Betygsskala: P, F</li><li>KON4 - Kontrollskrivning, 1,0 hp, Betygsskala: P, F</li><li>TENA - Hemtentamen, Betygsskala: A, B, C, D, E, FX, F</li></ul></p><p>Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p><p>TENA &#228;r ett valfritt examinationsmoment f&#246;r att uppn&#229; h&#246;gre betyg &#228;n E p&#229; kursen.</p></p>",
  //     "examinationModules": "<h4>INL1 - Inlämningsuppgifter, 3,5 hp</h4><h4>KON1 - Kontrollskrivning, 1,0 hp</h4><h4>KON2 - Kontrollskrivning, 1,0 hp</h4><h4>KON3 - Kontrollskrivning, 1,0 hp</h4><h4>KON4 - Kontrollskrivning, 1,0 hp</h4><h4>TENA - Hemtentamen</h4>",
  //     "gradingScale": "<p>A, B, C, D, E, FX, F</p>",
  //     "learningOutcomes": "<p>Efter godk&#228;nd kurs ska studenten kunna:</p><p>1.&#160; &#160; &#160; identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>2.&#160;&#160;&#160;&#160;&#160; f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>3.&#160;&#160;&#160;&#160;&#160; skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll</p><p>4.&#160;&#160;&#160;&#160;&#160; identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning</p><p>5.&#160;&#160;&#160;&#160;&#160; redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning</p><p>F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>6.&#160;&#160;&#160;&#160;&#160; visa kompetens f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver</p><p>7.&#160;&#160;&#160;&#160;&#160;&#160; agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>8.&#160;&#160;&#160;&#160;&#160; implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>9.&#160;&#160;&#160;&#160;&#160;&#160; utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>",
  //     "literatureTemplate": "<p>Meddelas vid kursstart.</p>",
  //     "otherRequirementsForFinalGrade": "<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>",
  //     "permanentDisability": "<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  //     <p><a href="https://www.kth.se/student/stod/studier/funktionsnedsattning/funka">Funka- stöd för studenter med funktionsnedsättningar</a></p>",
  //     "possibilityToAdditionTemplate": "",
  //     "possibilityToCompletionTemplate": "",
  //     "prerequisites": "",
  //     "recruitmentText": "",
  //     "schemaUrls": [
  //       "https://www.kth.se/social/course/ML1616/subgroup/ht-2022-tiips-7/calendar/",
  //       "https://www.kth.se/social/course/ML1616/subgroup/ht-2022-tiips-2/calendar/",
  //     ],
  //     "syllabusValid": {
  //       "validFromTerm": 20222,
  //       "validUntilTerm": "",
  //     },
  //     "title": "Industriell projektledning och projektstyrning",
  //   }
  // `)
})

test('parse the latest syllabus 20222 for 20231', () => {
  const foundSyllabus = parseSyllabus(courseML1616, '20222', 'sv')
  expect(foundSyllabus.syllabusValid.validFromTerm).toBe(20222)
  expect(foundSyllabus).toMatchInlineSnapshot(`
{
  "additionalRegulations": "",
  "courseContent": "<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>",
  "creditUnitAbbr": "hp",
  "equipmentTemplate": "",
  "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
  "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p><p>TENA &#228;r ett valfritt examinationsmoment f&#246;r att uppn&#229; h&#246;gre betyg &#228;n E p&#229; kursen.</p>",
  "learningOutcomes": "<p>Efter godk&#228;nd kurs ska studenten kunna:</p><p>1.&#160; &#160; &#160; identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>2.&#160;&#160;&#160;&#160;&#160; f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>3.&#160;&#160;&#160;&#160;&#160; skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll</p><p>4.&#160;&#160;&#160;&#160;&#160; identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning</p><p>5.&#160;&#160;&#160;&#160;&#160; redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning</p><p>F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>6.&#160;&#160;&#160;&#160;&#160; visa kompetens f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver</p><p>7.&#160;&#160;&#160;&#160;&#160;&#160; agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning</p><p>8.&#160;&#160;&#160;&#160;&#160; implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin</p><p>9.&#160;&#160;&#160;&#160;&#160;&#160; utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>",
  "literatureTemplate": "<p>Meddelas vid kursstart.</p>",
  "otherRequirementsForFinalGrade": "<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>",
  "permanentDisability": "<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  <p><a href="https://www.kth.se/student/stod/studier/funktionsnedsattning/funka">Funka- stöd för studenter med funktionsnedsättningar</a></p>",
  "possibilityToAdditionTemplate": "",
  "possibilityToCompletionTemplate": "",
  "recruitmentText": "",
  "syllabusValid": {
    "validFromTerm": 20222,
    "validUntilTerm": "",
  },
}
`)
})
