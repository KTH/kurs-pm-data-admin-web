const { findSyllabus } = require('../../server/koppsApi')
jest.mock('../../server/configuration', () => ({
  server: {
    koppsApi: { defaultTimeout: 0 },
    logging: { log: { level: 'info' } },
    proxyPrefixPath: {},
    session: { options: { sessionOptions: { secret: '' } } },
  },
}))
jest.mock('../../server/api', () => {})
jest.mock('../../server/Server', () => ({
  getPaths: () => [],
}))

const mockPublicSyllabusses = {
  publicSyllabusVersions: [
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
}
test('choose a correct syllabus for course ML1616', () => {
  const foundSyllabus = findSyllabus(mockPublicSyllabusses, '20212')
  expect(foundSyllabus.syllabusValid.validFromTerm).toBe(20192)
  expect(foundSyllabus).toMatchInlineSnapshot(`
    Object {
      "additionalRegulations": "",
      "courseContent": "<p>Kursen behandlar:</p><ul><li>Roller och ansvar inom projektledning</li></ul><ul><li>Metoder, tekniker, verktyg, processer och modeller som &#228;r anv&#228;ndbara inom omr&#229;det projektledning</li></ul><ul><li>Teoretisk och praktisk projektledning</li></ul>",
      "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
      "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning. Examinator f&#229;r medge annan examinationsform vid omexamination av enstaka studenter.</p>",
      "learningOutcomes": "<p>Efter avklarad kurs skall studenten f&#246;r betyg E kunna:</p><p>&#8226;&#160;&#160; &#160;identifiera de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;f&#246;rklara metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;skapa en projektmodell/projektprocess samt kunna till&#228;mpa den p&#229; ett verkligt och tidsbegr&#228;nsat projekt inom industriell teknik och produktionsunderh&#229;ll<br />&#8226;&#160;&#160; &#160;identifiera sin egen roll och p&#229;verkan som projektledare och avg&#246;ra det egna behovet av utveckling inom omr&#229;det projektledning<br />&#8226;&#160;&#160; &#160;redog&#246;ra muntligt och skriftligt f&#246;r aspekter inom projektledning<br />F&#246;r h&#246;gre betyg ska studenten &#228;ven kunna:</p><p>&#8226;&#160;&#160; &#160;visa kompentes f&#246;r punkterna ovan p&#229; ett djupare plan, samt d&#228;rut&#246;ver<br />&#8226;&#160;&#160; &#160;agera i flera av de olika roller och ansvarsomr&#229;den som &#228;r n&#246;dv&#228;ndiga f&#246;r effektiv projektledning<br />&#8226;&#160;&#160; &#160;implementera metoder, tekniker, verktyg och processer som &#228;r anv&#228;ndbara inom omr&#229;det projektledning f&#246;r effektiv ledning och styrning av projekt inom industrin<br />&#8226;&#160;&#160; &#160;utv&#228;rdera en industriellt anknuten projektmodell/projektprocess</p>",
      "otherRequirementsForFinalGrade": "<p>N&#228;rvaro vid specificerade obligatoriska kurstillf&#228;llen (eller genomf&#246;rd kompensationsuppgift till dessa) &#228;r krav f&#246;r slutlig betygs&#228;ttning.</p>",
      "syllabusValid": Object {
        "validFromTerm": 20192,
        "validUntilTerm": "",
      },
    }
  `)
})
const syllabussesEF1111 = {
  publicSyllabusVersions: [
    {
      edition: 1,
      validFromTerm: {
        term: 20191,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
        goals:
          '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
        content:
          '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
        disposition:
          '<p>Arbetet &#228;ger typiskt rum under 6-8 veckor. En eller flera handledare &#228;r tillg&#228;nglig under st&#246;rsta delen av arbetet, men det&#160;&#228;r viktigt att du &#228;r villig att arbeta sj&#228;lvst&#228;ndigt.</p>',
        eligibility:
          '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
        literature: '<p>Ingen fastst&#228;lld litteratur. Relevant material distribueras av handledaren.</p>',
        examComments:
          'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
        reqsForFinalGrade: '<p>Skriftlig tidplan och slutrapport, och minst en muntlig statusrapport.</p>',
        establishment: 'Kursplan för EF1111 gäller från och med VT19',
        languageOfInstruction: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
        ethicalApproach:
          '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
        courseSyllabusVersionValidFromTerm: {
          term: 20191,
        },
      },
    },
    {
      edition: 2,
      validFromTerm: {
        term: 20102,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
        goals:
          '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
        content:
          '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
        disposition:
          '<p>Arbetet &#228;ger typiskt rum under 6-8 veckor. En eller flera handledare &#228;r tillg&#228;nglig under st&#246;rsta delen av arbetet, men det&#160;&#228;r viktigt att du &#228;r villig att arbeta sj&#228;lvst&#228;ndigt.</p>',
        eligibility:
          '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
        literature: '<p>Ingen fastst&#228;lld litteratur. Relevant material distribueras av handledaren.</p>',
        examComments:
          'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
        reqsForFinalGrade: '<p>Skriftlig tidplan och slutrapport, och minst en muntlig statusrapport.</p>',
        establishment: 'Kursplan för EF1111 gäller från och med HT10',
        languageOfInstruction: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
        ethicalApproach:
          '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
        courseSyllabusVersionValidFromTerm: {
          term: 20102,
        },
      },
    },
  ],
}
test('choose an older syllabus for course EF1111, semester 20182', () => {
  const sullabusFor20182 = findSyllabus(syllabussesEF1111, '20182')
  expect(sullabusFor20182.syllabusValid.validFromTerm).toBe(20102)
  expect(sullabusFor20182.syllabusValid.validUntilTerm).toBe(20182)
  expect(sullabusFor20182).toMatchInlineSnapshot(`
    Object {
      "additionalRegulations": "",
      "courseContent": "<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>",
      "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
      "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.",
      "learningOutcomes": "<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>",
      "otherRequirementsForFinalGrade": "<p>Skriftlig tidplan och slutrapport, och minst en muntlig statusrapport.</p>",
      "syllabusValid": Object {
        "validFromTerm": 20102,
        "validUntilTerm": 20182,
      },
    }
  `)
})

test('choose the latest syllabus for course EF1111 semester 20221', () => {
  const sullabusFor20221 = findSyllabus(syllabussesEF1111, '20221')
  expect(sullabusFor20221.syllabusValid.validFromTerm).toBe(20191)
  expect(sullabusFor20221.syllabusValid.validUntilTerm).toBe('')

  expect(sullabusFor20221).toMatchInlineSnapshot(`
    Object {
      "additionalRegulations": "",
      "courseContent": "<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>",
      "ethicalApproach": "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
      "examComments": "Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.",
      "learningOutcomes": "<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>",
      "otherRequirementsForFinalGrade": "<p>Skriftlig tidplan och slutrapport, och minst en muntlig statusrapport.</p>",
      "syllabusValid": Object {
        "validFromTerm": 20191,
        "validUntilTerm": "",
      },
    }
  `)
})
