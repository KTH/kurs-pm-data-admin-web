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
    fetched: 'Hämtats',
    '(c)': 'från Kursinformation (c)',
    '(r)': 'från Kursinformation (r)',
    '(s)': 'från kursplan (s)',
    mandatory: 'Obligatorisk rubrik',
    mandatoryForSome: 'Obligatorisk rubrik för vissa kurser',
    includeInMemo: 'Inkludera i kurs-pm',
    noInfoYet: 'Ingen information finns inlagd. Redigera för att lägga in information',
    notIncludedInMemoYet:
      'Innehåll finns inlagt. Välj "Inkludera i kurs-pm" för att få med rubrik och innehåll i kurs-pm.',
    nothingFetched: {
      mandatoryAndEditable: `Inget innehåll är inlagt. Rubriken är obligatorisk och kommer att inkluderas i kurs-pm. 
      Välj Redigera för att lägga in innehåll.`,
      mandatory: `Inget innehåll fanns att hämta. Rubriken är obligatorisk och kommer att inkluderas i kurs-
      pm. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan.`,
      mandatoryForSome: `Inget innehåll fanns att hämta. 
      Rubriken gäller således inte för den här kursen och kommer därför inte att inkluderas i kurs-pm.`
    }
  },
  memoTitlesByMemoLang: {
    additionalRegulations: 'Övriga föreskrifter',
    communicationDuringCourse: 'Kommunikation i kursen',
    courseContent: 'Kursinnehåll',
    courseCoordinator: 'Kursansvarig',
    ethicalApproach: 'Etiskt förhållningssätt',
    ethicalApproachThisCourse: 'Kursspecifika regler för etiskt förhållningssätt',
    equipment: 'Utrustning',
    examination: 'Examination',
    examinationModules: 'Examinationsmoduler',
    examiner: 'Examinator',
    extraHeaders1: 'Egen rubrik 1',
    extraHeaders2: 'Egen rubrik 2',
    extraHeaders3: 'Egen rubrik 3',
    extraHeaders4: 'Egen rubrik 4',
    extraHeaders5: 'Egen rubrik 5',
    gradingCriteria: 'Målrelaterade betygskriterier',
    gradingScale: 'Betygsskala',
    infoContactName: 'Kontaktperson',
    infoForReregisteredStudents: 'Information till omregistrerade studenter',
    learningActivities: 'Läraktiviteter',
    learningOutcomes: 'Lärandemål',
    literature: 'Kurslitteratur',
    otherContacts: 'Övriga kontakter',
    otherRequirementsForFinalGrade: 'Övriga krav för slutbetyg',
    permanentDisability: 'Funktionsnedsättning',
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
      header: 'Övriga föreskrifter',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    communicationDuringCourse: {
      header: 'Kommunikation i kursen',
      body: `<p>Används till: att beskriva vem studenten kontakter för vad och hur det görs samt och när studenten kan förvanta sig svar.</p>
      <p>Varför: Om det finns beskrivet hur kommunikationen mellan studenter och lärare ska se ut så besparar det tid och arbete ...</p>
      <p>För att editera innehållet så väljer du: "Visa i kurs-pm”. </p>
      <p>Du kan sedan välja “Visa vägledning”  för att få hjälp med vad som kan finnas med och hur innehållet kan presenteras</p>`
    },
    courseContent: {
      header: 'Kursinnehåll',
      body: `<p><b>Kursinnehåll</b> beskriver ämnesinnehållet och de generella färdigheter som behandlas eller tränas i kursen.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka begrepp, ämnen, färdigheter m.m. som den behöver läsa in sig på inför och under kursen. 
      Kursinnehållet hjälper på så sätt studenten att förbereda sig inför och under kursen.</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Kursinnehåll kan ändras eftersom informationen är en del av kursplanen. Läs mer om riktlinjer för att ändra Kursinnehåll på sidan 
      <a href="https://intra.kth.se/utbildning/utbi/forbereda-utbildning/andra-i-en-kursplan-andra-kursuppgifter-i-ladok-ej-forskarniva" target="_blank">Ändra i en kursplan, ändra kursuppgifter i Ladok (ej forskarnivå)</a> (öppnas i ny flik).</p>`
    },
    courseCoordinator: {
      header: 'Kursansvarig',
      body: `<p>Innehållet hämtas från den kursgemensamma informationen</p>
      <p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p>
      <p>Vad är examiner ....</p>`
    },
    ethicalApproach: {
      header: 'Etiskt förhållningssätt',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    ethicalApproachThisCourse: {
      header: 'Kursspecifika regler för etiskt förhållningssätt',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    equipment: {
      header: 'Utrustning',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examination: {
      header: 'Examination',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examinationModules: {
      header: 'Examinationsmoduler',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    examiner: {
      header: 'Examinator',
      body: `<p>Innehållet hämtas från den kursgemensamma informationen</p>
      <p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p>
      <p>Vad är examiner ....</p>`
    },
    extraHeaders1: {
      header: 'Egen rubrik 1',
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders2: {
      header: 'Egen rubrik 2',
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders3: {
      header: 'Egen rubrik 3',
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders4: {
      header: 'Egen rubrik 4',
      body: 'Lägg till egna rubriker H3'
    },
    extraHeaders5: {
      header: 'Egen rubrik 5',
      body: 'Lägg till egna rubriker H3'
    },
    gradingCriteria: {
      header: 'Målrelaterade betygskriterier',
      body: `<p><b>Målrelaterade betygskriterier</b> ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål.</p>
      <p><b>Informationen hjälper studenten</b> att förstå hur betygskriterierna relaterar till lärandemålen och med det vad den behöver göra och kunna för att uppnå respektive betyg på kursen. Att tydligt beskriva betygskriterierna bidrar även till att motivera studenten.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Visa i kurs-pm”. Ange information om målrelaterade betygskriterier i inmatningsfältet. Du kan välja ”Hjälptext” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Betygskriterierna ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål, där godkänt betyg ska innebära en grundläggande uppfyllelse av målen. Betygskriterier för högre nivåer kan exempelvis gälla kvaliteten på utförandet, svårighetsgraden, hur olika delar av kursinnehållet kombineras och nivå i Blooms taxonomi.</p>
      <p>Examinationen ska vara tydligt kopplad till betygskriterierna. Om det finns flera examinationsmoment i kursen ska det i anslutning till betygskriterierna framgå vilka lärandemål som examineras i vilket examinationsmoment, hur slutbetyget vägs ihop av delbetyg och hur delbetyg vägs ihop av delbedömningar efter betygskriterierna.</p>
      <p>Läs mer om betygskriterier och hitta konkreta exempel på 
      <a href="https://intra.kth.se/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Målrelaterade betygskriterier</a> (öppnas i ny flik).</p>`
    },
    gradingScale: {
      header: 'Betygsskala',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    infoContactName: {
      header: 'Kontaktperson',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    infoForReregisteredStudents: {
      header: 'Information till omregistrerade studenter',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    learningActivities: {
      header: 'Läraktiviteter',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    learningOutcomes: {
      header: 'Lärandemål',
      body: `<p><b>Lärandemål</b> ska tydliggöra vilka kunskaper, färdigheter, värderingsförmågor och förhållningssätt som studenten ska visa efter genomgången kurs.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vad studenten behöver uppnå för att få ett godkänt betyg. 
      Lärandemålen hjälper med det studenten att lägga en plan för kursens genomförande. 
      Efterföljande information i detta kurs-pm relaterar till kursens lärandemål varför det är viktigt att informationen är väl formulerad.</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Lärandemål kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra Lärandemål på sidan <a href="https://intra.kth.se/utbildning/utbi/forbereda-utbildning/andra-i-en-kursplan-andra-kursuppgifter-i-ladok-ej-forskarniva" target="_blank">Ändra i en kursplan, ändra kursuppgifter i Ladok (ej forskarnivå)</a> (öppnas i ny flik).</p>`
    },
    literature: {
      header: 'Kurslitteratur',
      body: `<p><b>Kurslitteratur</b> beskriver vilken litteratur som används i kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att införskaffa rätt kurslitteratur inför kursomgångens start. 
      För studenter med funktionsnedsättning är det viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst. 
      Därför bör uppgifterna finnas tillgängliga minst 8 veckor före kursstart.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om kurslitteratur i inmatningsfältet. 
      Om det finns kursgemensamma uppgifter om kurslitteratur i Kopps kommer den informationen hämtas automatiskt till nya kurs-pm. 
      Du kan välja att behålla den informationen i detta kurs-pm eller skriva ny information som endast gäller den kursomgång som detta kurs-pm skrivs för. 
      Du kan välja ”Hjälptext” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Kurslitteratur" beskriver du vilken kurslitteratur som används i denna kursomgång. 
      Om du valt att skapa ett nytt kurs-pm kommer information att hämtas automatiskt från den kursgemensamma informationen om kurslitteratur i Kopps. 
      Du kan välja att behålla den hämtade informationen eller skriva kurslitteratur specifikt för kursomgången som detta kurs-pm gäller för. 
      Du kan då ersätta den hämtade texten med text som anges i inmatningsfältet.</p>
      <p>Lista kurslitteraturen tydligt. Ange författare, utgivningsår, titel och förlag. 
      Hänvisa även till platser där litteraturen finns tillgänglig i digital form, exempelvis om den finns tillgänglig i Canvas.</p>
      <p>Många studenter vill förbereda sig inför kursstart med att skaffa kurslitteraturen. 
      För studenter med funktionsnedsättning är det viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst eller liknande. 
      Ny kurslitteratur bör därför finnas tillgänglig minst 8 veckor före kursstart.</p>
      <p>Om kurslitteratur inte är relevant för denna kursomgång är det bra att skriva det explicit för att studenterna inte ska behöva ställa frågan. 
      Rubriken kurslitteratur är obligatorisk i kurs-pm och kommer alltid visas i kurs-pm oavsett om det finns relevant kurslitteratur eller inte på kursomgången.</p>`
    },
    otherContacts: {
      header: 'Övriga kontakter',
      body: `<p>Används till: att lägga in andra kontakter än de som är obligatoriska. </p>
      <p>Varför: Det är viktigt för studenter att ha alla kontakter som de behöver för kursen samlade här.</p> 
      <p>För att editera innehållet så väljer du: "Visa i kurs-pm”.</p> 
      <p>Du kan sedan välja “Visa vägledning”  för att få hjälp med vad som kan finnas med och hur innehållet kan presenteras.</p> `
    },
    otherRequirementsForFinalGrade: {
      header: 'Övriga krav för slutbetyg',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    permanentDisability: {
      header: 'Funktionsnedsättning',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToAddition: {
      header: 'Möjlighet till plussning',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToCompletion: {
      header: 'Möjlighet till komplettering',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    possibilityToCompensate: {
      header: 'Möjlighet till ersättningsuppgifter',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    preparations: {
      header: 'Särskilda förberedelser',
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....'
    },
    prerequisites: {
      header: 'Rekommenderade förkunskaper',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    reportingResults: {
      header: 'Resultatrapportering',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    scheduleDetails: {
      header: 'Detaljschema',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    software: {
      header: 'Programvara',
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
    },
    teacher: {
      header: 'Lärare',
      body:
        '<p>Innehållet hämtas från den kursgemensamma informationen</p><p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p><p>Vad är Lärare ....</p>'
    },
    teacherAssistants: {
      header: 'Lärarassistenter',
      body:
        '<p>Innehållet hämtas från den kursgemensamma informationen</p><p>Redigering av innehåll kan göras av Behöriga <a href="#">(länk)</a> i KOPPS.</p><p>Vad är Lärassistenter ....</p>'
    }
  },
  pages: [
    {
      title: '1.Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-pm som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-pm för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-pm på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-pm. I sista steget (3 av 3) har du möjlighet att först granska kurs-pm och sedan publicera kurs-pm på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: '2.Redigera kurs-pm',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: 'Granska och publicera',
      intro: `I detta steg (3 av 3) visas hur kurs-PM data kommer att se ut på sidan .... 
      Här finns möjlighet att gå tillbaka för att redigera ytterligare, spara som utkast eller publicera direkt.`
    }
  ],
  progressHeaders: [
    {
      title: '1.Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-pm som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-pm för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-pm på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-pm. I sista steget (3 av 3) har du möjlighet att först granska kurs-pm och sedan publicera kurs-pm på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: '2.Redigera kurs-pm',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: 'Granska och publicera',
      intro: ''
    }
  ],
  sectionsLabels: {
    contentAndOutcomes: 'Innehåll och lärandemål',
    prep: 'Förbereda inför kursstart',
    reqToFinal: 'Examination och slutförande',
    extra: 'Ytterligare Information',
    contacts: 'Kontakter'
  },
  pageTitles: {
    new: 'Skapa och publicera kurs-pm',
    // draft: 'Publicera kurs-PM utkast',
    // published: 'Ändra publicerad kurs-PM',
    preview: 'Skapa och publicera kurs-pm'
  },
  actionModals: {
    infoCancel: {
      header: 'Att tänka på innan du avbryter!',
      body: `Utkast sparas automatiskt från det att du påbörjat steg 2, Redigera kurs-pm. Vill du inte behålla utkastet kan du välja Radera utkast i steg 1, Välj kursomgång,nästa gång du använder tjänsten Skapa och publicera kurs-pm.
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
    }
  },
  info: {
    chooseSavedDraft: 'Fortsätt redigera ett sparat utkast',
    createNew: 'Skapa nytt eller kopiera?',
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
        infoText: 'Listade kurstillfällen saknar ett publicerat kurs-pm eller utkast'
      },
      existedDrafts: {
        label: 'Välj det utkast du vill fortsätta att redigera',
        infoText: 'Listade utkast är sparade men ej publicerade'
      }
    },
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    noCourseRoundsAvailable:
      'Samtliga kurstillfällen för denna termin ingår redan i en kursomgång som har ett publicerat kurs-pm eller utkast.',
    noSavedDrafts: 'Det finns inga sparade utkast.',
    noSemesterAvailable:
      'Det finns inga terminer att välja eftersom det saknas aktuella eller kommande kursomgångar för denna kurs. Kontrollera i systemet Kopps om du förväntar dig kursomgångar att skriva kurs-pm för.'
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnClose: 'Stäng',
    btnRemove: 'Radera utkast',
    closeEditor: 'Stäng redigeringsläge',
    preview: 'Granska',
    edit: 'Redigera',
    cancel: 'Avbryt',
    save: 'Spara utkast',
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
    // hasSavedDraft: 'Finns utkast kurs-pm',
    contentHeaders: {
      title: 'Rubriker',
      intro: 'Rubriker....'
    }
  },
  alerts: {
    autoSaved: 'Sparat utkast',
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    errNoChosen:
      'Du måste välja ett utkast eller minst ett kurstillfälle för att kunna gå vidare till nästa steg Redigera kurs-pm.',
    errWhileSaving: 'Det gick inte att skapa utkasten på grund av bakgrund system fel......',
    warnReplacePm:
      'Observera: publicering av nytt uppladdat kurs-PM kommer att ersättas befintligt kurs-PM (se "Välj kursomgång" nedan)'
  }
}
