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
    host_name: 'KTH'
  },
  header: {
    courseContent: 'Kursinnehåll',
    learningOutcomes: 'Lärandemål',
    equipment: 'Utrustning',
    literature: 'Kurslitteratur',
    additionalRegulations: 'Övriga föreskrifter',
    gradingScale: 'Betygsskala',
    ethicalApproach: 'Etiskt förhållningssätt',
    examination: 'Examination',
    examinationComment: '+ [kommentar till examination (fast text)]',
    examinationCommentEditable: '+ [kommentar till examination (fritext)]',
    supplementaryExam: 'Möjlighet till komplettering',
    raiseApprovedGrade: 'Möjlighet till plussning',
    otherRequirementsForFinalGrade: 'Övriga krav för slutbetyg',
    examiner: 'Examinator',
    communicationWithTeachers: 'Kommunikation med lärare',
    courseCoordinator: 'Kursansvarig',
    labSupervisors: 'Labbhandledare',
    teacherAssistants: 'Lärarassistenter',
    teacher: 'Lärare',
    languageOfInstructions: 'Undervisningsspråk',
    planning: 'Detaljplanering',
    gradingCriteria: 'Målrelaterade betygskriterier'
  },
  pages: [
    {
      title: '1. Välj kursomgång',
      intro: `Börja med att välja termin och kursomgång för den kursanalys som ska publiceras (steg 1 av 3). 
      I nästa steg (2 av 3) kommer viss kurs PM data för kursen att hämtas automatiskt från Kopps och UG för den termin och kursomgång som valts. Det finns sedan möjlighet att redigera viss kurs-PM data. 
      I sista steget (3 av 3) ges möjlighet att först granska och sedan publicera kurs-PM på sidan ....`
    },
    {
      title: '2. Redigera kurs-PM data',
      intro: `I detta steg (2 av 3) ska kurs-PM data redigeras, förändringar för vald kursomgång summeras samt kurs-PM data kontrolleras och vid behov justeras. 
      I nästa steg granskas all kurs-PM data innan publicering.`
    },
    {
      title: '3. Granska och publicera',
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
    new: 'Publicera ny kurs-PM',
    draft: 'Publicera kurs-PM utkast',
    published: 'Ändra publicerad kurs-PM',
    preview: 'Förhandsgranska sparat utkast av kurs-PM'
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
    }
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btn_preview: 'Granska',
    btn_edit: 'Redigera',
    btn_cancel: 'Avbryt',
    btn_save: 'Spara utkast',
    btn_publish: 'Publicera',
    btn_back: 'Välj kursomgång',
    btn_delete: 'Radera',
    btn_save_and_cancel: 'Spara utkast och avsluta',
    btn_copy: 'Kopiera länk till utkast'
  }
}
