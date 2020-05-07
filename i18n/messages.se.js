module.exports = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',

    /**
     * Error messages
     */

    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Message keys
     */
    service_name: 'kurs-pm-data-admin-web',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Svenska',

    site_name: 'Administration av kurs-PM',
    host_name: 'KTH',

    /**
     * Headings
     */
    page_header_heading_semester: 'Termin',
    page_header_heading_course_round: 'Kursomgång'
  },
  /** Labels */
  sourceInfo: {
    addNewTitle: 'Ange rubrik',
    fetched: 'Hämtats',
    '(c)': 'från kursgemensam information',
    '(r)': 'från kurstillfällesinformation',
    '(s)': 'från kursplan (s)',
    errorEmptyTitle: 'Du måste ange en rubrik',
    mandatory: 'Fast rubrik',
    mandatoryAndEditable: 'Fast rubrik',
    mandatoryForSome: 'Fast rubrik för vissa kurser',
    includeInMemo: {
      section: 'Inkludera rubrik',
      subSection: 'Inkludera avsnitt'
    },
    noInfoYet: {
      section:
        'Inget innehåll är inlagt. Välj Redigera för att lägga in innehåll eller välj att inte inkludera rubriken.',
      subSection:
        'Inget innehåll är inlagt. Välj Redigera för att lägga in innehåll eller välj att inte inkludera avsnittet.'
    },
    // includera rubrik
    notIncludedInMemoYet: {
      section:
        'Innehåll finns inlagt. Välj: Inkludera rubrik för att visa rubrik med innehåll i kurs-PM',
      subSection: 'Innehåll finns inlagt. Välj: Inkludera avsnitt för att visa innehållet i kurs-PM'
    },
    nothingFetched: {
      mandatoryAndEditable: `Inget innehåll är inlagt. Rubriken är obligatorisk och kommer att inkluderas i kurs-PM. 
      Välj Redigera för att lägga in innehåll.`,
      mandatory: `Inget innehåll fanns att hämta. Rubriken är obligatorisk och kommer att inkluderas i kurs-
      pm. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan.`,
      mandatoryForSome: `Inget innehåll fanns att hämta. 
      Rubriken gäller således inte för den här kursen och kommer därför inte att inkluderas i kurs-PM.`,
      optional: `Inget innehåll fanns att hämta. Instruktioner om hur man ändrar hämtadinformation ges i informationsikonen ovan. 
      Du kan också välja att inte inkludera rubriken.`
    }
  },
  memoTitlesByMemoLang: {
    additionalRegulations: 'Övriga föreskrifter',
    commentAboutMadeChanges: 'Gjorda ändringar',
    communicationDuringCourse: 'Kommunikation i kursen',
    courseContent: 'Kursinnehåll',
    courseCoordinator: 'Kursansvarig',
    ethicalApproach: 'Etiskt förhållningssätt',
    equipment: 'Utrustning',
    examination: 'Examination',
    examiner: 'Examinator',
    extraHeaders1: 'Egen rubrik 1',
    extraHeaders2: 'Egen rubrik 2',
    extraHeaders3: 'Egen rubrik 3',
    extraHeaders4: 'Egen rubrik 4',
    extraHeaders5: 'Egen rubrik 5',
    gradingCriteria: 'Målrelaterade betygskriterier',
    gradingScale: 'Betygsskala',
    infoForReregisteredStudents: 'Ändringar inför denna kursomgång',
    learningActivities: 'Läraktiviteter',
    learningOutcomes: 'Lärandemål',
    literature: 'Kurslitteratur',
    otherContacts: 'Övriga kontakter',
    otherRequirementsForFinalGrade: 'Övriga krav för slutbetyg',
    permanentDisability: 'Stöd för studenter med funktionsnedsättning',
    possibilityToAddition: 'Möjlighet till plussning',
    possibilityToCompletion: 'Möjlighet till komplettering',
    possibilityToCompensate: 'Möjlighet till ersättningsuppgifter',
    preparations: 'Särskilda förberedelser',
    prerequisites: 'Rekommenderade förkunskaper',
    reportingResults: 'Resultatrapportering',
    scheduleDetails: 'Detaljschema',
    software: 'Programvara',
    teacher: 'Lärare',
    teacherAssistants: 'Lärarassistenter'
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    commentAboutMadeChanges: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    communicationDuringCourse: {
      body: `<p>Används till: att beskriva vem studenten kontakter för vad och hur det görs samt och när studenten kan förvanta sig svar.</p>
      <p>Varför: Om det finns beskrivet hur kommunikationen mellan studenter och lärare ska se ut så besparar det tid och arbete ...</p>
      <p>För att editera innehållet så väljer du: "Visa i kurs-PM”. </p>
      <p>Du kan sedan välja “Visa vägledning”  för att få hjälp med vad som kan finnas med och hur innehållet kan presenteras</p>`
    },
    courseContent: {
      body: `<p><b>Kursinnehåll</b> beskriver ämnesinnehållet och de generella färdigheter som behandlas eller tränas i kursen.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka begrepp, ämnen, färdigheter m.m. som den behöver läsa in sig på inför och under kursen. 
      Kursinnehållet hjälper på så sätt studenten att förbereda sig inför och under kursen.</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Kursinnehåll kan ändras eftersom informationen är en del av kursplanen. Läs mer om riktlinjer för att ändra Kursinnehåll på sidan 
      <a href="https://intra.kth.se/utbildning/utbi/forbereda-utbildning/andra-i-en-kursplan-andra-kursuppgifter-i-ladok-ej-forskarniva" target="_blank">Ändra i en kursplan, ändra kursuppgifter i Ladok (ej forskarnivå)</a> (öppnas i ny flik).</p>`
    },
    courseCoordinator: {
      body: `<p>Innehållet hämtas från den kursgemensamma informationen</p>
      <p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p>
      <p>Vad är examiner ....</p>`
    },
    ethicalApproach: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    ethicalApproachSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    equipment: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examination: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examinationSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examiner: {
      body: `<p>Innehållet hämtas från den kursgemensamma informationen</p>
      <p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p>
      <p>Vad är examiner ....</p>`
    },
    extraHeaders1: {
      body: '<p>Here you can add owh headers to H3</p>'
    },
    extraHeaders2: {
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders3: {
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders4: {
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders5: {
      body: 'Lägg till egna rubriker H3'
    },
    gradingCriteria: {
      body: `<p><b>Målrelaterade betygskriterier</b> ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål.</p>
      <p><b>Informationen hjälper studenten</b> att förstå hur betygskriterierna relaterar till lärandemålen och med det vad den behöver göra och kunna för att uppnå respektive betyg på kursen. Att tydligt beskriva betygskriterierna bidrar även till att motivera studenten.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Visa i kurs-PM”. Ange information om målrelaterade betygskriterier i inmatningsfältet. Du kan välja ”Hjälptext” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Betygskriterierna ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål, där godkänt betyg ska innebära en grundläggande uppfyllelse av målen. Betygskriterier för högre nivåer kan exempelvis gälla kvaliteten på utförandet, svårighetsgraden, hur olika delar av kursinnehållet kombineras och nivå i Blooms taxonomi.</p>
      <p>Examinationen ska vara tydligt kopplad till betygskriterierna. Om det finns flera examinationsmoment i kursen ska det i anslutning till betygskriterierna framgå vilka lärandemål som examineras i vilket examinationsmoment, hur slutbetyget vägs ihop av delbetyg och hur delbetyg vägs ihop av delbedömningar efter betygskriterierna.</p>
      <p>Läs mer om betygskriterier och hitta konkreta exempel på 
      <a href="https://intra.kth.se/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Målrelaterade betygskriterier</a> (öppnas i ny flik).</p>`
    },
    gradingScale: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    infoForReregisteredStudents: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    learningActivities: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    learningOutcomes: {
      body: `<p><b>Lärandemål</b> ska tydliggöra vilka kunskaper, färdigheter, värderingsförmågor och förhållningssätt som studenten ska visa efter genomgången kurs.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vad studenten behöver uppnå för att få ett godkänt betyg. 
      Lärandemålen hjälper med det studenten att lägga en plan för kursens genomförande. 
      Efterföljande information i detta kurs-PM relaterar till kursens lärandemål varför det är viktigt att informationen är väl formulerad.</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Lärandemål kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra Lärandemål på sidan <a href="https://intra.kth.se/utbildning/utbi/forbereda-utbildning/andra-i-en-kursplan-andra-kursuppgifter-i-ladok-ej-forskarniva" target="_blank">Ändra i en kursplan, ändra kursuppgifter i Ladok (ej forskarnivå)</a> (öppnas i ny flik).</p>`
    },
    literature: {
      body: `<p><b>Kurslitteratur</b> beskriver vilken litteratur som används i kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att införskaffa rätt kurslitteratur inför kursomgångens start. 
      För studenter med funktionsnedsättning är det viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst. 
      Därför bör uppgifterna finnas tillgängliga minst 8 veckor före kursstart.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om kurslitteratur i inmatningsfältet. 
      Om det finns kursgemensamma uppgifter om kurslitteratur i Kopps kommer den informationen hämtas automatiskt till nya kurs-PM. 
      Du kan välja att behålla den informationen i detta kurs-PM eller skriva ny information som endast gäller den kursomgång som detta kurs-PM skrivs för. 
      Du kan välja ”Hjälptext” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Kurslitteratur" beskriver du vilken kurslitteratur som används i denna kursomgång. 
      Om du valt att skapa ett nytt kurs-PM kommer information att hämtas automatiskt från den kursgemensamma informationen om kurslitteratur i Kopps. 
      Du kan välja att behålla den hämtade informationen eller skriva kurslitteratur specifikt för kursomgången som detta kurs-PM gäller för. 
      Du kan då ersätta den hämtade texten med text som anges i inmatningsfältet.</p>
      <p>Lista kurslitteraturen tydligt. Ange författare, utgivningsår, titel och förlag. 
      Hänvisa även till platser där litteraturen finns tillgänglig i digital form, exempelvis om den finns tillgänglig i Canvas.</p>
      <p>Många studenter vill förbereda sig inför kursstart med att skaffa kurslitteraturen. 
      För studenter med funktionsnedsättning är det viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst eller liknande. 
      Ny kurslitteratur bör därför finnas tillgänglig minst 8 veckor före kursstart.</p>
      <p>Om kurslitteratur inte är relevant för denna kursomgång är det bra att skriva det explicit för att studenterna inte ska behöva ställa frågan. 
      Rubriken kurslitteratur är obligatorisk i kurs-PM och kommer alltid visas i kurs-PM oavsett om det finns relevant kurslitteratur eller inte på kursomgången.</p>`
    },
    otherContacts: {
      body: `<p>Används till: att lägga in andra kontakter än de som är obligatoriska. </p>
      <p>Varför: Det är viktigt för studenter att ha alla kontakter som de behöver för kursen samlade här.</p> 
      <p>För att editera innehållet så väljer du: "Visa i kurs-PM”.</p> 
      <p>Du kan sedan välja “Visa vägledning”  för att få hjälp med vad som kan finnas med och hur innehållet kan presenteras.</p> `
    },
    otherRequirementsForFinalGrade: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    permanentDisability: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    permanentDisabilitySubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToAddition: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToCompletion: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToCompensate: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    preparations: {
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....'
    },
    prerequisites: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    reportingResults: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    scheduleDetails: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    software: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    teacher: {
      body:
        '<p>Innehållet hämtas från den kursgemensamma informationen</p><p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p><p>Vad är Lärare ....</p>'
    },
    teacherAssistants: {
      body:
        '<p>Innehållet hämtas från den kursgemensamma informationen</p><p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p><p>Vad är Lärassistenter ....</p>'
    }
  },
  pagesCreateNewPm: [
    {
      title: '1.Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-PM som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-PM för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-PM på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) har du möjlighet att först granska kurs-PM och sedan publicera kurs-PM på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: '2.Redigera kurs-PM',
      intro: ''
    },
    {
      title: 'Granska och publicera',
      intro: `I detta steg (3 av 3) visas hur kurs-PM data kommer att se ut på sidan .... 
      Här finns möjlighet att gå tillbaka för att redigera ytterligare, spara som utkast eller publicera direkt.`
    }
  ],
  pagesChangePublishedPm: [
    {
      title: '1. Välj kurs-PM',
      intro: `Börja med att välja det kurs-PM som ska ändras (steg 1 av 3). 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) ges möjlighet att först granska kurs-PM 
      och sedan publicera en ny version av kurs-PM på sidan: Om kursen / Förbereda och gå (kurs-PM)`
    },
    {
      title: '2. Redigera kurs-PM',
      intro: ''
    },
    {
      title: '3. Granska och publicera',
      intro: `I detta steg (3 av 3) visas hur kurs-PM data kommer att se ut på sidan .... 
      Här finns möjlighet att gå tillbaka för att redigera ytterligare, spara som utkast eller publicera direkt.`
    }
  ],
  progressBarHeaders: [
    {
      title: '1. Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-PM som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-PM för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-PM på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) har du möjlighet att först granska kurs-PM och sedan publicera kurs-PM på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: '2. Redigera kurs-PM',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: '3. Granska och publicera',
      intro: ''
    }
  ],
  progressTitleHeaders: [
    {
      title: '1. Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-PM som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-PM för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-PM på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) har du möjlighet att först granska kurs-PM och sedan publicera kurs-PM på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: '2. Redigera kurs-PM',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: 'Granska kurs-PM som sida',
      intro: `I detta steg (3 av 3) visas hur kurs-PM data kommer att se ut på sidan .... 
      Här finns möjlighet att gå tillbaka för att redigera ytterligare, spara som utkast eller publicera direkt.`
    }
  ],
  sectionsLabels: {
    contentAndOutcomes: 'Innehåll och lärandemål',
    prep: 'Förbereda inför kursstart',
    reqToFinal: 'Examination och slutförande',
    extra: 'Ytterligare information',
    contacts: 'Kontakter'
  },
  pageTitles: {
    new: 'Skapa och publicera kurs-PM',
    // draft: 'Publicera kurs-PM utkast',
    published: 'Ändra publicerat kurs-PM',
    preview: 'Skapa och publicera kurs-PM'
  },
  actionModals: {
    infoCancel: {
      header: 'Att tänka på innan du avbryter!',
      body: `Utkast sparas automatiskt från det att du påbörjat steg 2, Redigera kurs-PM. Vill du inte behålla utkastet kan du välja Radera utkast i steg 1, Välj kursomgång,nästa gång du använder tjänsten Skapa och publicera kurs-PM.
        <br/>
        <br/>
        Vill du fortsätta att avbryta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avbryta'
    },
    infoPublish: {
      header: 'Att tänka på innan du publicerar!',
      body: `Publicering kommer att ske på sidan Kursens utveckling och historik.
        <br/>
        <br/>
        Vill du fortsätta att publicera?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt publicera'
    },
    infoRemove: {
      header: 'Att tänka på innan du raderar utkastet!',
      body: `Radera utkast kan inte ångras. Utkastet kommer att försvinna.
      <br/><br/>
      Vill du fortsätta radera utkastet?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera'
    },
    newSectionRemove: {
      header: 'Att tänka på innan du ta bort en tillagd rubrik!',
      body: `Rubriken med innehåll kommer att raderas och kan inte återskapas.
      <br/><br/>
      Vill du fortsätta radera den tillagd rubriken?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera'
    }
  },
  info: {
    chooseSavedDraft: 'Fortsätt redigera ett sparat utkast',
    createNew: 'Skapa nytt eller kopiera?',
    choosePublishedMemo: 'Välj kurs-PM',
    chooseSemester: {
      header: 'Välj termin',
      body:
        '<p>Välj vilken termin kursomgången startar. Om kursomgången sträcker sig över flera terminer; välj kursomgångens starttermin.</p>'
    },
    chooseRound: {
      header: 'Välj kursomgång',
      body: `<p>Välj alla kurstillfällen som ingår i kursomgången. 
      Studenter är antagna till ett kurstillfälle. 
      Programstudenter, betalande studenter och fristående studenter antas till olika kurstillfällen men kan utbildas i samma kursomgång. 
      Kurstillfällen ska alltså grupperas ihop till en kursomgång. Kursomgången är ett praktiskt genomförande av en kurs. 
      Kursomgången har engemensam starttidpunkt, gemensam kurstakt och normalt gemensam undervisning för en studentgrupp. 
      Schemat läggs per kursomgång, kurs-PM utformas per kursomgång och kursanalys genomförs per kursomgång.</p>`,
      availableRounds: {
        label: 'Markera ett eller flera kurstillfällen som ingår i kursomgången',
        infoText: 'Listade kurstillfällen saknar ett publicerat kurs-PM eller utkast'
      },
      existedDrafts: {
        label: 'Välj det utkast du vill fortsätta att redigera',
        infoText: 'Listade utkast är sparade men ej publicerade'
      },
      publishedMemos: {
        label: 'Välj det kurs-PM du vill redigera: ',
        infoText: 'Kurs-PM listade är publicerade'
      }
    },
    publishedHasDraft: ' (finns opublicerade ändringar)',
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    noCourseRoundsAvailable:
      'Samtliga kurstillfällen för denna termin ingår redan i en kursomgång som har ett publicerat kurs-PM eller utkast.',
    noSavedDrafts: 'Det finns inga sparade utkast.',
    noSemesterAvailable:
      'Det finns inga terminer att välja eftersom det saknas aktuella eller kommande kursomgångar för denna kurs. Kontrollera i systemet Kopps om du förväntar dig kursomgångar att skriva kurs-PM för.',
    noPublishedMemos:
      'Det finns inga publicerade kursomgångar för denna termin, föregående eller kommande.'
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Lägg till rubrik till ',
    btnClose: 'Stäng',
    btnRemove: 'Radera utkast',
    btnRemoveHeader: 'Ta bort tillagd rubrik',
    closeEditor: 'Stäng redigeringsläge',
    preview: 'Granska',
    edit: 'Redigera',
    cancel: 'Avbryt',
    save: 'Spara',
    saveDraft: 'Spara utkast',
    publish: 'Publicera',
    goToRounds: 'Välj kursomgång',
    save_and_cancel: 'Spara utkast och avsluta',
    btn_copy: 'Kopiera länk till utkast',
    btn_switch_view_single: 'Ändra till ”Fokus-vy”',
    btn_switch_view_scroll: 'Ändra till ”Översikts-vy”'
  },
  extraInfo: {
    season: {
      1: 'VT ',
      2: 'HT '
    },
    labelStartDate: 'Startdatum',
    // hasSavedDraft: 'Finns utkast kurs-PM',
    contentHeaders: {
      title: 'Rubriker',
      intro: 'Rubriker....'
    },
    commentChanges: 'Ange alla ändringar i denna version:',
    mandatory: 'Obligatorisk'
  },
  alerts: {
    autoSaved: 'Sparat utkast',
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    errNoChosen:
      'Du måste välja ett utkast eller minst ett kurstillfälle för att kunna gå vidare till nästa steg Redigera kurs-PM.',
    errNoInPublishedChosen: 'Du måste välja ett kurs-PM för att kunna gå vidare till Redigera',
    errWhileSaving: 'Det gick inte att skapa utkasten på grund av bakgrund system fel......',
    infoAboutFreshData:
      'Viss information som hämtas har ändrats i källsystemen sedan förra versionen av kurs-PM publicerades. Den uppdaterad informationen visas nedan.',
    infoRebuildDraft: 'Återgick till sist publicerade version????????',
    infoStartAgain:
      'Det finns ändringar som ej publicerats! Nedan visas kurs-PM med ändringar. Du kan i stället välja att: ',
    linkToRefreshData: 'utgå från senaste publicerade kurs-PM',
    warnFillInCommentAboutChanges:
      'Du behöver fylla i obligatoriska fält (markerade i rött nedan) för att gå vidare till “Granska och publicera”',
    warnNameNewSection:
      'Du behöver ange ett namn på den tillagda rubriken (se markering i rött övan)',
    warnReplacePm:
      'Observera: publicering av nytt uppladdat kurs-PM kommer att ersättas befintligt kurs-PM (se "Välj kursomgång" nedan)'
  },
  breadCrumbLabels: {
    university: 'KTH',
    student: 'Student på KTH',
    directory: 'Kurs- och programkatalogen',
    aboutCourse: 'Om kursen',
    noLinksInPreview: 'Länkar i menyn fungerar inte i granska-läge'
  },
  sideMenuLabels: {
    directory: 'Kurs- och programkatalogen',
    aboutCourse: 'Om kursen',
    beforeChoosingCourse: 'Inför kursval',
    courseMemo: 'Förbereda, gå (kurs-PM)',
    finishCourse: 'Slutföra ej avklarad kurs',
    courseDevelopmentAndHistory: 'Kursens utveckling och historik',
    noLinksInPreview: 'Länkar i menyn fungerar inte i granska-läge'
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Undervisningsspråk',
    offeredByTitle: 'Kursen ges av',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik'
  },
  courseMemoLinksLabels: {
    versionTitle: 'Version kurs-PM',
    latest: 'Senaste:',
    courseMemoArchiveLabel: 'Arkiv för kurs-PM',
    courseMemoPdf: 'Kurs-PM som pdf',
    syllabus: 'Kursplan',
    syllabusInformation: '(s) information hämtas från',
    syllabusLinkStart: 'Kursplan (',
    syllabusLinkEnd: '– )',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik'
  },
  courseLinksLabels: {
    linkHeaderTitle: 'Student på KTH',
    beforeAndDuringACourse: 'Inför och under en kurs',
    contactPersonsAndStudentCounselling: 'Studievägledare och kanslier',
    rightsAndResponsibilities: 'Rättigheter och skyldigheter',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik'
  },
  courseContactsLabels: {
    courseContactsTitle: 'Kontakter',
    communicationWithTeachersTitle: 'Kommunikation i kursen',
    courseCoordinatorTitle: 'Kursansvarig',
    teacherTitle: 'Lärare',
    teacherAssistantsTitle: 'Lärarassistenter',
    examinerTitle: 'Examinator',
    otherContactsTitle: 'Övriga kontakter',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik'
  },
  courseHeaderLabels: {
    courseHeaderTitle: 'Kurs-PM',
    adminLinkLabel: 'Administrera Om kursen',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik'
  },
  courseImage: {
    Arkitektur: 'Picture_by_MainFieldOfStudy_01_Architecture.jpg',
    Bioteknik: 'Picture_by_MainFieldOfStudy_02_Biotechnology.jpg',
    'Datalogi och datateknik': 'Picture_by_MainFieldOfStudy_03_Computer_Science.jpg',
    Elektroteknik: 'Picture_by_MainFieldOfStudy_04_Electrical_Engineering.jpg',
    Fysik: 'Picture_by_MainFieldOfStudy_05_Physics.jpg',
    'Industriell ekonomi': 'Picture_by_MainFieldOfStudy_06_Industrial_Management.jpg',
    Informationsteknik: 'Picture_by_MainFieldOfStudy_07_Information_Technology.jpg',
    'Informations- och kommunikationsteknik':
      'Picture_by_MainFieldOfStudy_08_Information_Communication.jpg',
    Kemiteknik: 'Picture_by_MainFieldOfStudy_09_Chemical_Science.jpg',
    'Kemi och kemiteknik': 'Picture_by_MainFieldOfStudy_10_Chemistry_Chemical.jpg',
    Matematik: 'Picture_by_MainFieldOfStudy_11_Mathematics.jpg',
    Miljöteknik: 'Picture_by_MainFieldOfStudy_12_Environmental_Engineering.jpg',
    'Molekylära livsvetenskaper': 'Picture_by_MainFieldOfStudy_13_Molecular_Life_Science.jpg',
    Maskinteknik: 'Picture_by_MainFieldOfStudy_14_Mechanical_Engineering.jpg',
    Materialvetenskap: 'Picture_by_MainFieldOfStudy_15_Materials_Science.jpg',
    'Medicinsk teknik': 'Picture_by_MainFieldOfStudy_16_Medical_Engineering.jpg',
    Materialteknik: 'Picture_by_MainFieldOfStudy_17_Materials_Engineering.jpg',
    Samhällsbyggnad: 'Picture_by_MainFieldOfStudy_18_Built_Environment.jpg',
    'Teknisk fysik': 'Picture_by_MainFieldOfStudy_19_Engineering_Physics.jpg',
    'Teknik och ekonomi': 'Picture_by_MainFieldOfStudy_20_Technology_Economics.jpg',
    'Teknik och hälsa': 'Picture_by_MainFieldOfStudy_21_Technology_Health.jpg',
    'Teknik och management': 'Picture_by_MainFieldOfStudy_22_Technology_Management.jpg',
    Teknik: 'Picture_by_MainFieldOfStudy_23_Technology.jpg',
    'Teknik och lärande': 'Picture_by_MainFieldOfStudy_25_Technology_Learning.jpg',
    default: 'Picture_by_MainFieldOfStudy_26_Default_picture.jpg'
  }
}
