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
    '(c)': 'Hämtad från Kursinformation (c)',
    '(pm)': '(pm)',
    '(r)': 'Hämtad från Kursinformation (r)',
    '(s)': 'Hämtad från kursplan (s)',
    mandatory: 'Obligatorisk rubrik',
    shown: {
      // Remove or use for alt
      true: 'visas i kurs-pm',
      false: 'döljs i kurs-pm'
    },
    includeInMemo: 'Inkludera i kurs-pm',
    noInfoYet: 'Ingen information finns inlagd. "Redigera" för att lägga in information',
    notIncludedInMemoYet:
      'Innehåll finns inlagt. Välj "Inkludera i kurs-pm" för att få med rubrik och innehåll i kurs-pm.'
  },
  memoHeadings: {
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
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`
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
      title: 'Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för det kurs-pm som ska publiceras (steg 1 av 3). 
      Du kan i detta steg välja om du vill skapa ett helt nytt kurs-pm för kursomgången eller skapa ett utkast genom att kopiera innehållet från ett tidigare kurs-pm på denna kurs. 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-pm. I sista steget (3 av 3) har du möjlighet att först granska kurs-pm och sedan publicera kurs-pm på kursplatsen “Om kursen“ för vald termin och kursomgång.`
    },
    {
      title: 'Redigera kurs-pm',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: 'Granska och publicera',
      intro: `I detta steg (3 av 3) visas hur kurs-PM data kommer att se ut på sidan .... 
      Här finns möjlighet att gå tillbaka för att redigera ytterligare, spara som utkast eller publicera direkt.`
    }
  ],
  sections: {
    contentAndOutcomes: 'Innehåll och lärandemål',
    prep: 'Kurslitteratur och förberedelser',
    reqToFinal: 'Examination och slutförande',
    extra: 'Ytterligare Information'
  },
  pageTitles: {
    new: 'Skapa och publicera nytt kurs-pm'
    // draft: 'Publicera kurs-PM utkast',
    // published: 'Ändra publicerad kurs-PM',
    // preview: 'Förhandsgranska sparat utkast av kurs-PM'
  },
  actionModals: {
    infoCancel: {
      header: 'Att tänka på innan du avbryter!',
      body: `Ändringar för text och bild kommer att försvinna om du avbryter. 
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
      header: 'Att tänka på innan du ta bort utkast!',
      body: `Ändringar för text och bild kommer att försvinna om du raderar utkast. 
      <br/>  
      <br/> 
            Vill du fortsätta att radera?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera'
    }
  },
  info: {
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
      availableRounds:
        'Följande kurstillfällen saknar ett publicerat kurs-pm eller utkast. Markera ett eller flera kurstillfällen som ingår i kursomgången:',
      existedDrafts:
        'Följande kursomgångar har sparade utkast som ännu ej publicerats. Välj ett utkast och klicka på knappen redigera för att fortsätta redigera utkastet.'
    }
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnClose: 'Stäng',
    btnRemove: 'Radera utkast',
    btn_preview: 'Granska',
    btn_edit: 'Redigera',
    btn_cancel: 'Avbryt',
    btn_save: 'Spara utkast',
    btn_publish: 'Publicera',
    btn_back: 'Välj kursomgång',
    btn_delete: 'Radera',
    btn_save_and_cancel: 'Spara utkast och avsluta',
    btn_copy: 'Kopiera länk till utkast',
    btn_show_in_memo: 'Visa i kurs-pm',
    btn_hide_in_memo: 'Dölj i kurs-pm',
    btn_switch_view_single: 'Ändra till ”Fokus-vy”',
    btn_switch_view_scroll: 'Ändra till ”Översikts-vy”'
  },
  extraInfo: {
    courseShortSemester: {
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
    errNoChosen:
      'Du måste välja ett utkast eller minst ett kurstillfälle för att kunna gå vidare till nästa steg Redigera kurs-pm.',
    errWhileSaving: 'Det gick inte att skapa utkasten på grund av bakgrund system fel......',
    warnReplacePm:
      'Observera: publicering av nytt uppladdat kurs-PM kommer att ersättas befintligt kurs-PM (se "Välj kursomgång" nedan)'
  }
}
