const mockMiniKoppsObj = {
  course: {
    title: { sv: 'Projekt i plasmafysik', en: 'Project in Plasma Physics' },
    credits: 9,
    creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
    creditUnitAbbr: { sv: 'hp', en: 'hp' },
  },
  lastTermsInfo: [
    {
      term: '20211',
      rounds: [
        {
          //used
          shortName: 'CBIOT1 m.fl.',
          ladokRoundId: '3',
          firstTuitionDate: '2021-03-20',
          language: { sv: 'Svenska', en: 'Swedish' },
          applicationCodes: ['3'],
        },
        {
          //used
          shortName: '',
          ladokRoundId: '2',
          firstTuitionDate: '2021-01-18',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['2'],
        },
        {
          //todo: add as course round
          shortName: '',
          ladokRoundId: '1',
          firstTuitionDate: '2021-03-22',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['1'],
        },
      ],
      examinationRounds: [
        {
          examCode: 'PRO1',
          title: { sv: 'Projektuppgift', en: 'Project' },
          credits: 9,
          creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
          creditUnitAbbr: { sv: 'hp', en: 'hp' },
          gradeScaleCode: 'PF',
        },
      ],
      courseSyllabus: {
        edition: 1,
        validFromTerm: '20191',
        discontinuationText: {
          sv: 'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
          en: 'If the course is discontinued, students may request to be examined during the following two academic years',
        },
        establishment: {
          sv: 'Kursplan för EF1111 gäller från och med VT19',
          en: 'Course syllabus for EF1111 valid from Spring 2019',
        },
        languageOfInstruction: {
          sv: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
          en: 'The language of instruction is specified in the course offering information in the course catalogue.',
        },
        goals: {
          sv: '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
          en: '<p>After completing the course you should have some practical experience of performing one or several typical tasks in the field of plasma physics, including data analysis and development or evaluation of measurement techniques and instrumentation. You should be able to formulate a realistic goal for a time-restricted task, plan it, follow up the execution with the help of the formulated plan, and to be able to document your work in an effective way.</p>',
        },
        content: {
          sv: '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
          en: '<p>The project tasks may include</p><ul><li>processing laboratory data</li><li>design of a measurement technique</li><li>literature search and summary of a particular field</li><li>programming of data processing and presentation tools.</li></ul>',
        },
        eligibility: {
          sv: '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
          en: '<p>For single course students: general admission requirements including documented proficiency in&#160;English A.</p>',
        },
        examComments: {
          sv: 'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
          en: 'Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.',
        },
        transitionalRegulations: { sv: '', en: '' },
        ethicalApproach: {
          sv: '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
          en: "<ul><li>All members of a group are responsible for the group's work.</li><li>In any assessment, every student shall honestly disclose any help received and sources used.</li><li>In an oral assessment, every student shall be able to present and answer questions about the entire assignment and solution.</li></ul>",
        },
      },
    },
    {
      term: '20202',
      rounds: [
        {
          // used merged T
          shortName: 'CBIOT1 m.fl.',
          ladokRoundId: '3',
          firstTuitionDate: '2020-10-30',
          language: { sv: 'Svenska', en: 'Swedish' },
          applicationCodes: ['3'],
        },
        {
          // used merged T
          shortName: '',
          ladokRoundId: '2',
          firstTuitionDate: '2020-08-24',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['2'],
        },
        {
          shortName: '',
          ladokRoundId: '1',
          firstTuitionDate: '2020-10-26',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['1'],
        },
      ],
      examinationRounds: [
        {
          examCode: 'PRO1',
          title: { sv: 'Projektuppgift', en: 'Project' },
          credits: 9,
          creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
          creditUnitAbbr: { sv: 'hp', en: 'hp' },
          gradeScaleCode: 'PF',
        },
      ],
      courseSyllabus: {
        edition: 1,
        validFromTerm: '20191',
        discontinuationText: {
          sv: 'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
          en: 'If the course is discontinued, students may request to be examined during the following two academic years',
        },
        establishment: {
          sv: 'Kursplan för EF1111 gäller från och med VT19',
          en: 'Course syllabus for EF1111 valid from Spring 2019',
        },
        decisionToDiscontinue: { sv: '', en: '' },
        languageOfInstruction: {
          sv: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
          en: 'The language of instruction is specified in the course offering information in the course catalogue.',
        },
        goals: {
          sv: '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
          en: '<p>After completing the course you should have some practical experience of performing one or several typical tasks in the field of plasma physics, including data analysis and development or evaluation of measurement techniques and instrumentation. You should be able to formulate a realistic goal for a time-restricted task, plan it, follow up the execution with the help of the formulated plan, and to be able to document your work in an effective way.</p>',
        },
        content: {
          sv: '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
          en: '<p>The project tasks may include</p><ul><li>processing laboratory data</li><li>design of a measurement technique</li><li>literature search and summary of a particular field</li><li>programming of data processing and presentation tools.</li></ul>',
        },
        eligibility: {
          sv: '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
          en: '<p>For single course students: general admission requirements including documented proficiency in&#160;English A.</p>',
        },
        examComments: {
          sv: 'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
          en: 'Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.',
        },
        transitionalRegulations: { sv: '', en: '' },
        ethicalApproach: {
          sv: '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
          en: "<ul><li>All members of a group are responsible for the group's work.</li><li>In any assessment, every student shall honestly disclose any help received and sources used.</li><li>In an oral assessment, every student shall be able to present and answer questions about the entire assignment and solution.</li></ul>",
        },
      },
    },
    {
      term: '20201',
      rounds: [
        {
          shortName: 'ShortNameTest',
          ladokRoundId: '2',
          firstTuitionDate: '2020-01-15',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['2'],
        },
        {
          //used only published
          shortName: 'CDATA',
          ladokRoundId: '1',
          firstTuitionDate: '2020-03-16',
          language: { sv: 'Svenska', en: 'Swedish' },
          applicationCodes: ['2'],
        },
      ],
      examinationRounds: [
        {
          examCode: 'PRO1',
          title: { sv: 'Projektuppgift', en: 'Project' },
          credits: 9,
          creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
          creditUnitAbbr: { sv: 'hp', en: 'hp' },
          gradeScaleCode: 'PF',
        },
      ],
      courseSyllabus: {
        edition: 1,
        validFromTerm: '20191',
        discontinuationText: {
          sv: 'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
          en: 'If the course is discontinued, students may request to be examined during the following two academic years',
        },
        establishment: {
          sv: 'Kursplan för EF1111 gäller från och med VT19',
          en: 'Course syllabus for EF1111 valid from Spring 2019',
        },
        decisionToDiscontinue: { sv: '', en: '' },
        languageOfInstruction: {
          sv: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
          en: 'The language of instruction is specified in the course offering information in the course catalogue.',
        },
        goals: {
          sv: '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
          en: '<p>After completing the course you should have some practical experience of performing one or several typical tasks in the field of plasma physics, including data analysis and development or evaluation of measurement techniques and instrumentation. You should be able to formulate a realistic goal for a time-restricted task, plan it, follow up the execution with the help of the formulated plan, and to be able to document your work in an effective way.</p>',
        },
        content: {
          sv: '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
          en: '<p>The project tasks may include</p><ul><li>processing laboratory data</li><li>design of a measurement technique</li><li>literature search and summary of a particular field</li><li>programming of data processing and presentation tools.</li></ul>',
        },
        eligibility: {
          sv: '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
          en: '<p>For single course students: general admission requirements including documented proficiency in&#160;English A.</p>',
        },
        examComments: {
          sv: 'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
          en: 'Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.',
        },
        transitionalRegulations: { sv: '', en: '' },
        ethicalApproach: {
          sv: '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
          en: "<ul><li>All members of a group are responsible for the group's work.</li><li>In any assessment, every student shall honestly disclose any help received and sources used.</li><li>In an oral assessment, every student shall be able to present and answer questions about the entire assignment and solution.</li></ul>",
        },
      },
    },
    {
      term: '20192',
      rounds: [
        {
          //used only published
          shortName: '',
          ladokRoundId: '2',
          firstTuitionDate: '2019-08-26',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['2'],
        },
        {
          //used published which have active draft
          shortName: '',
          ladokRoundId: '1',
          firstTuitionDate: '2019-10-28',
          language: { sv: 'Engelska', en: 'English' },
          applicationCodes: ['1'],
        },
      ],
      examinationRounds: [
        {
          examCode: 'PRO1',
          title: { sv: 'Projektuppgift', en: 'Project' },
          credits: 9,
          creditUnitLabel: { sv: 'Högskolepoäng', en: 'Credits' },
          creditUnitAbbr: { sv: 'hp', en: 'hp' },
          gradeScaleCode: 'PF',
        },
      ],
      courseSyllabus: {
        edition: 1,
        validFromTerm: '20191',
        discontinuationText: {
          sv: 'När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.',
          en: 'If the course is discontinued, students may request to be examined during the following two academic years',
        },
        establishment: {
          sv: 'Kursplan för EF1111 gäller från och med VT19',
          en: 'Course syllabus for EF1111 valid from Spring 2019',
        },
        decisionToDiscontinue: { sv: '', en: '' },
        languageOfInstruction: {
          sv: 'Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.',
          en: 'The language of instruction is specified in the course offering information in the course catalogue.',
        },
        goals: {
          sv: '<p>Efter slutf&#246;rd kurs kommer du att ha praktisk erfarenhet av att utf&#246;ra en eller flera typiska arbetsuppgifter inom plasmafysik, som t ex dataanalys och utveckling eller utv&#228;rdering av m&#228;ttekniker och instrumentering.&#160;Du ska kunna formulera ett realistiskt m&#229;l f&#246;r en tidsbegr&#228;nsad uppgift, f&#246;lja upp genomf&#246;randet och kunna dokumentera ditt arbete.</p>',
          en: '<p>After completing the course you should have some practical experience of performing one or several typical tasks in the field of plasma physics, including data analysis and development or evaluation of measurement techniques and instrumentation. You should be able to formulate a realistic goal for a time-restricted task, plan it, follow up the execution with the help of the formulated plan, and to be able to document your work in an effective way.</p>',
        },
        content: {
          sv: '<p>Projektarbetet kan inkludera</p><ul><li>behandling av laboratoriedata</li><li>design av enmatteknik</li><li>litteraturs&#246;kning och sammanfattning av ett specifikt omr&#229;de</li><li>programmering av databehandling och presentationsverktyg</li></ul>',
          en: '<p>The project tasks may include</p><ul><li>processing laboratory data</li><li>design of a measurement technique</li><li>literature search and summary of a particular field</li><li>programming of data processing and presentation tools.</li></ul>',
        },
        eligibility: {
          sv: '<p>F&#246;r frist&#229;ende studenter: allm&#228;nna antagningsvillkor och engelska A eller motsvarande.</p>',
          en: '<p>For single course students: general admission requirements including documented proficiency in&#160;English A.</p>',
        },
        examComments: {
          sv: 'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
          en: 'Based on recommendation from KTH’s coordinator for disabilities, the examiner will decide how to adapt an examination for students with documented disability. <br><br>The examiner may apply another examination format when re-examining individual students.',
        },
        transitionalRegulations: { sv: '', en: '' },
        ethicalApproach: {
          sv: '<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>',
          en: "<ul><li>All members of a group are responsible for the group's work.</li><li>In any assessment, every student shall honestly disclose any help received and sources used.</li><li>In an oral assessment, every student shall be able to present and answer questions about the entire assignment and solution.</li></ul>",
        },
      },
    },
  ],
}

export default mockMiniKoppsObj
