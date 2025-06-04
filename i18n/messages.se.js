module.exports = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',

    language_link_lang_en: 'English',

    /**
     * Error messages
     */
    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Authentication message
     */

    contact_support: 'Kontakta',
    for_questions: 'vid frågor.',
    friendly_message_have_not_rights: 'Du saknar behörighet att använda Om kursens administrationsverktyg',
    message_have_not_rights: `Du saknar behörighet att använda Om kursens administrationsverktyg. Behörighet ges per automatik till de som är inlagda som examinator, kursansvarig eller lärare för kursen i Kopps.`,
    message_have_not_rights_link_pre_text: 'Det är möjligt att',
    message_have_not_rights_link_href:
      'https://intra.kth.se/utbildning/systemstod/om-kursen/behorighet-for-om-kursen-1.1051642',
    message_have_not_rights_link_text: 'beställa administratörsbehörighet till Om kursens administrationsverktyg',
    message_have_not_rights_link_after_text:
      'Beställningen behöver göras av Utbildningsadministrativt Ansvarig (UA) på skolan, eller av närmsta chef i samråd med UA.',

    /**
     * Message keys
     */
    service_name: 'kurs-pm-data-admin-web',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.871898',
    locale_text: 'Denna sida på svenska',
    main_site_name: 'Administrera Om kursen ',
    site_name: 'Administrera Om kursen',
    host_name: 'KTH',
    skip_to_main_content: 'Hoppa till huvudinnehållet',

    memoLabel: 'Kurs-PM',

    /**
     * Headings
     */
    page_header_heading_semester: 'Termin',
    page_header_heading_course_round: 'Kursomgång',
  },
  /** Labels */
  sourceInfo: {
    addNewHeading: 'Ange rubrik',
    fetched: 'Innehåll hämtas ',
    '(c)': 'från Kopps',
    '(r)': 'från kurstillfällesinformation',
    '(s)': 'från kursplan',
    '(o)': 'från sidan inför kursval',
    errorEmptyHeading: 'Du måste ange en rubrik',
    mandatory: 'Inkluderas alltid',
    mandatoryAndEditable: `Inkluderas alltid (går att redigera)`,
    mandatoryAndEditableWithoutDefault: `Inkluderas alltid (går att redigera)`,
    mandatoryForSome: 'Inkluderas när innehåll finns i kursplan',
    includeInMemo: {
      section: 'Inkludera i kurs-PM',
      subSection: 'Inkludera ytterligare avsnitt',
    },
    noInfoYet: {
      section: 'Inget innehåll är inlagt. Lägg in innehåll eller ta bort rubriken från kurs-PM.',
      subSection: 'Inget innehåll är inlagt. Lägg in innehåll eller ta bort avsnittet från kurs-PM.',
    },
    noInfoYetPreview: 'Ingen information tillagd',
    // includera rubrik
    notIncludedInMemoYet: {
      section: 'Innehåll finns inlagt. Välj: Inkludera för att visa rubrik med innehåll i kurs-PM',
      subSection: 'Innehåll finns inlagt. Välj: Inkludera avsnitt för att visa innehållet i kurs-PM',
    },
    nothingFetched: {
      mandatoryAndEditable: `Inget innehåll är inlagt. Rubriken är obligatorisk och kommer att inkluderas i kurs-PM. Välj Redigera för att lägga in innehåll.`,
      mandatoryAndEditableWithoutDefault: 'Välj Redigera för att lägga in innehåll',
      mandatory: `Inget innehåll fanns att hämta. Rubriken är obligatorisk och kommer att inkluderas i kurs-PM. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan.`,
      mandatoryForSome: `Inget innehåll fanns att hämta. Rubriken gäller således inte för den här kursen och kommer därför inte att inkluderas i kurs-PM.`,
      optional: `Inget innehåll fanns att hämta. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan. Du kan också välja att inte inkludera rubriken.`,
    },
    insertedSubSection: 'Avsnittet nedan kommer inte från kursplanen:',
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
    gradingCriteria: 'Målrelaterade betygskriterier/bedömningskriterier',
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
    scheduleDetails: 'Detaljplanering',
    software: 'Programvara',
    teacher: 'Lärare',
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: `<p><b>Övriga föreskrifter</b> beskriver föreskrifter i kursplanen som inte ryms under övriga rubriker.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursomgångens genomförande.</p> 
      <p><b>Innehåll hämtas från kursplanen i Kopps och kan inte redigeras här.</b> Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan  <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik). Om det inte finns något innehåll kommer rubriken inte visas i ditt kurs-PM.</p>`,
    },
    commentAboutMadeChanges: {
      body: `<p><b>Gjorda ändringar</b> utgör en logg av de ändringar som gjorts i ett publicerat kurs-PM. Informationen kommer inte att visas publikt. Gjorda ändringar ska innefatta kort vilka rubriker som ändrats och varför det ändrats. Systemet sparar datum och tidpunkt för varje publicerad ändring.</p>`,
      help: `<p></p>
      <p></p>`,
    },
    communicationDuringCourse: {
      body: `<p><b>Kommunikation i kursen</b> beskriver hur kommunikationen med lärare och annan personal sker under kursomgången. Här kan man även ange vem som ska kontaktas gällande vanliga frågor och ärenden.</p>
			<p><b>Informationen hjälper studenten</b> att förstå hur den ska kommunicera inför och under kursomgången. Med tydligt beskrivna instruktioner kommer kommunikationen blir mer effektiv för både studenter och lärare.</p>`,
      help: `<p>Här beskriver du hur kommunikation ska gå till inför och under kursomgångens genomförande. Du kan t.ex. hänvisa till lärare innan kursens start och till Canvas för kommunikation under kursens gång. Om olika frågor ska kommuniceras på olika sätt kan du övergripande beskriva hur man ska kommunicera om respektive fråga.</p>
      <p>Kontaktuppgifter till examinator, kursansvarig och lärare hämtas automatiskt till ditt kurs-PM, du behöver därför inte ange dessa uppgifter på nytt.</p>`,
    },
    courseContent: {
      body: `<p><b>Kursinnehåll</b> beskriver ämnesinnehållet och de generella färdigheter som behandlas i kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka begrepp, ämnen, färdigheter m.m. som den behöver läsa in sig på inför och under kursomgången.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps och kan inte redigeras här.</b>
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan 
      <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    courseCoordinator: {
      body: `<p><b>Kursansvarig</b> innehåller kontaktinformation till personer som har rollen kursansvarig under denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> med kontaktuppgifter till kursansvarig under kursomgången.</p>
      <p><b>Innehåll hämtas från Kopps</b> och kan redigeras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet</a> (Båda länkarna öppnas i ny flik).</p>`,
    },
    ethicalApproach: {
      body: `<p><b>Etiskt förhållningssätt</b> beskriver KTH:s etiska värdegrund.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka etiska värderingar som gäller på kursomgången, vilka skyldigheter den har och vilka riktlinjer den har att rätta sig efter under kursen genomförande. Tydligt beskrivna etiska riktlinjer ökar studentens förtroende för KTH.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps</b> (den fasta texten överst) men kan även kompletteras genom att lägga till ett ytterligare stycke om Etiskt förhållningssätt.</p>`,
      help: `<p>Under rubriken finns två sektioner. Överst visas en fast text från kursens kursplan. Texten är generella etiska riktlinjer för alla kurser på KTH och är inte redigerbar. 
      Efter den fasta texten följer en sektion där du kan ange information om etiskt förhållningssätt som är specifik för eller extra relevant i denna kursomgång. Du kan beskriva om det finns särskilda regler för t.ex. grupparbete, hemuppgifter, programmering m.m. 
      Läs mer om KTH:s <a href="https://intra.kth.se/polopoly_fs/1.738196.1562741233!/L%C3%A4sanvisningar%20till%20etisk%20policy%20f%C3%B6r%20KTH%20FR%202017-02-08.pdf" target="_blank">etiska policy</a> för att få stöd. Du kan också ta hjälp av <a href="https://www.kth.se/eecs/utbildning/hederskodex" target="_blank">EECS-skolans hederskodex</a> (öppnas i ny flik) för lärare och studenter.</p>`,
    },
    ethicalApproachSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`,
      help: `<p>Under rubriken finns två sektioner. Överst visas en fast text från kursens kursplan. Texten är generella etiska riktlinjer för alla kurser på KTH och är inte redigerbar. 
      Efter den fasta texten följer en sektion där du kan ange information om etiskt förhållningssätt som är specifik för eller extra relevant i denna kursomgång. Du kan beskriva om det finns särskilda regler för t.ex. grupparbete, hemuppgifter, programmering m.m. 
      Läs mer om KTH:s <a href="https://intra.kth.se/polopoly_fs/1.738196.1562741233!/L%C3%A4sanvisningar%20till%20etisk%20policy%20f%C3%B6r%20KTH%20FR%202017-02-08.pdf" target="_blank">etiska policy</a> för att få stöd. Du kan också ta hjälp av <a href="https://www.kth.se/eecs/utbildning/hederskodex" target="_blank">EECS-skolans hederskodex</a> (öppnas i ny flik) för lärare och studenter.</p>`,
    },
    equipment: {
      body: `<p><b>Utrustning</b> beskriver vilken utrustning som inte tillhandahålls av KTH och som behövs för att kunna följa kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att skaffa rätt utrustning inför kursomgångens start.</p>`,
      help: `<p>Här beskriver du vilken utrustning som studenten behöver för att genomföra kursen, om den inte tillhandahålls av KTH. Skrivdon och litteratur räknas inte till utrustning.</p>`,
    },
    examination: {
      body: `<p><b>Examination</b> beskriver hur kursen examineras och detaljer om de examinerande modulerna.</p>
      <p><b>Informationen hjälper studenten</b> att planera kursens genomförande och att förbereda sig inför examinationsmodulerna.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps</b> (den fasta texten överst) men kan även kompletteras genom att lägga till ett ytterligare stycke om examination.
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    examinationSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`,
      help: `<p>Under rubriken finns två sektioner. Överst visas en fast text från kursens kursplan. Sedan följer en sektion där du kan utveckla informationen om varje modul. Systemet skapar automatiskt underrubriker för varje modul. 
      Läs mer om vad som ska ingå under rubriken "Examination" i <a href="https://intra.kth.se/utbildning/systemstod/om-kursen/kurs-pm/riktilinjer-1.1184855" target="_blank">Riktlinjer för kurs-PM</a> (öppnas i ny flik).</p>`,
    },
    examiner: {
      body: `<p><b>Examinator</b> innehåller kontaktinformation till personer som har rollen examinator för denna kurs.</p>
      <p><b>Informationen hjälper studenten</b> med kontaktuppgifter till examinator under kursomgången.</p>
      <p><b>Innehåll hämtas från Kopps</b> och kan redigeras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet</a> (Båda länkarna öppnas i ny flik).</p>`,
    },
    extraHeaders1: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Innehåll och lärandemål".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Du kan skapa en egen rubrik för information som är relaterat till rubriken "Innehåll och lärandemål", men som inte passar in under någon av de andra underrubrikerna i mallen. Du kan namnge rubriken som du själv önskar för att passa just den information du vill lägga in.</p>`,
    },
    extraHeaders2: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Förberedelser inför kursstart".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Du kan skapa en egen rubrik för information som är relaterat till rubriken "Förberedelser inför kursstart", men som inte passar in under någon av de andra underrubrikerna i mallen. Du kan namnge rubriken som du själv önskar för att passa just den information du vill lägga in.</p>`,
    },
    extraHeaders3: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Examination och slutförande".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Du kan skapa en egen rubrik för information som är relaterat till rubriken "Examination och slutförande", men som inte passar in under någon av de andra underrubrikerna i mallen. Du kan namnge rubriken som du själv önskar för att passa just den information du vill lägga in.</p>`,
    },
    extraHeaders4: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Ytterligare information".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Du kan skapa en egen rubrik för information som är relaterat till rubriken "Ytterligare information", men som inte passar in under någon av de andra underrubrikerna i mallen. Du kan namnge rubriken som du själv önskar för att passa just den information du vill lägga in.</p>`,
    },
    gradingCriteria: {
      body: `<p><b>Målrelaterade betygskriterier/bedömningskriterier</b> anger de krav som studenten ska uppfylla för de olika betygen och ska utformas utifrån kursplanens mål.</p>
      <p><b>Informationen hjälper studenten</b> att förstå hur betygskriterierna/bedömningskriterierna relaterar till lärandemålen och vad studenten behöver göra och kunna för att uppnå respektive betyg på kursen.</p>`,
      help: `<p>Här beskriver du de målrelaterade betygskriterier/bedömningskriterier som gäller för kursomgången. 
      Betygskriterier ska finnas för alla kurser och kursmoduler med det sjugradiga eller tregradiga betygssystemet. För kursmoduler som betygssätts enligt det tvågradiga betygssystemet behöver inga särskilda betygskriterier tas fram då målen i sig utgör betygskriterier.</p>
      <p>Läs mer och hitta konkreta exempel på 
      <a href="https://intra.kth.se/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Målrelaterade betygskriterier</a> (öppnas i ny flik).</p>`,
    },
    gradingScale: {
      body: `<p><b>Betygsskala</b> beskriver betygsskalan för slutbetyg på hela kursen.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilket betyg den kan förvänta sig efter slutförd kurs.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps och kan inte redigeras här.</b> Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    infoForReregisteredStudents: {
      body: `<p><b>Ändringar inför denna kursomgång</b> beskriver vilka större ändringar som har införts till denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka förbättringar som gjorts inför kursomgången. Informationen kan också uppmärksamma omregistrerade studenter på förändringar från föregående kursomgångar som de behöver ta hänsyn till.</p>`,
      help: `<p>Här beskriver du vilka ändringar som gjorts inför denna kursomgång. Det kan också vara viktigt att beskriva relevanta slutsatser från föregående kursvärderingar och kursanalyser som hjälper studenten att prioritera i sin planering för denna kursomgång.</p>`,
    },
    learningActivities: {
      body: `<p><b>Läraktiviteter</b> beskriver vilka typer av aktiviteter som planerats för kursomgången. Läraktiviteter definierar vad t.ex. ett seminarium, en lektion eller en laboration är på just denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå och planera inför kursomgångens aktiviteter.</p>`,
      help: `<p>Här beskriver du vilka typer av läraktiviteter som är planerade under kursomgången. Ge de olika typerna ett intuitivt och gärna vedertaget begrepp som du sedan använder konsekvent i detta kurs-PM.</p>
      <p>Beskriv kortfattat vad de olika typerna av läraktiviteter innebär på just denna kursomgång, och vad som är bra för studenten att känna till. Du kan också beskriva hur omfattande läraktiviteterna är.</p>`,
    },
    learningOutcomes: {
      body: `<p><b>Lärandemål</b> tydliggör vilka kunskaper, färdigheter, värderingsförmågor och förhållningssätt som studenten ska visa efter genomgången kurs.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vad den behöver uppnå för att få ett godkänt betyg.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps och kan inte redigeras här.</b> Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    literature: {
      body: `<p><b>Kurslitteratur</b> beskriver vilken litteratur som används i kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att skaffa rätt kurslitteratur inför kursomgångens start. För studenter med funktionsnedsättning är det extra viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst.</p>`,
      help: `<p>Här beskriver du vilken kurslitteratur som används i denna kursomgång. Rubriken är obligatorisk i kurs-PM.
      Lista kurslitteraturen med författare, utgivningsår, titel och förlag. Hänvisa även till platser litteraturen kan laddas ner, om den finns tillgänglig i digital form.</p>
      <p>Om kurslitteratur inte är relevant för denna kursomgång är det bra att skriva det så att studenten vet detta.</p>`,
    },
    otherContacts: {
      body: `<p><b>Övriga kontakter</b> beskriver kontaktinformation till personer och funktioner som studenten kan behöva komma i kontakt med, och som inte har någon av rollerna examinator, kursansvarig eller lärare. Övriga kontakter kan vara kursadministratör, labbhandledare, projekthandledare.</p>
			<p><b>Informationen hjälper studenten</b> med kontaktuppgifter till personer som kan besvara frågor som inte kan besvaras av examinator, kursansvarig eller lärare.</p>`,
      help: `<p>Här anger du vilka personer eller funktioner som kan vara relevanta att kontakta under kursomgången. Ange namn, mailadress och/eller telefonnummer. Beskriv kortfattat vilka frågor eller synpunkter de kan kontaktas om.</p>
      <p>Kontaktuppgifter till examinator, kursansvarig och lärare hämtas automatiskt till ditt kurs-PM, du behöver därför inte ange dessa uppgifter på nytt.</p>`,
    },
    otherRequirementsForFinalGrade: {
      body: `<p><b>Övriga krav för slutbetyg</b> beskriver ytterligare krav för betyg på hel kurs, utöver vad som anges under rubriken Examination, t.ex. krav på närvaro.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursomgångens genomförande.</p>
      <p><b>Innehåll hämtas från kursplanen i Kopps och kan inte redigeras här.</b> Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>
      <p><b>Om det inte finns något innehåll</b> kommer rubriken inte visas i ditt kurs-PM.</p>`,
    },
    permanentDisability: {
      body: `<p><b>Stöd för studenter med funktionsnedsättning</b> beskriver vilka rättigheter och möjligheter som finns för studenter med funktionsnedsättning. Informationen beskriver vilket stöd de kan väntas få under kursomgången och hur de går tillväga för att få stödet.</p>
      <p><b>Informationen hjälper studenter</b> med funktionsnedsättning att förstå hur de kan få rätt stöd för att genomföra kursomgången.</p>`,
      help: `<p>Under rubriken finns två sektioner. Överst visas en fast text, som inte är redigerbar. Den fasta texten innehåller en webblänk till KTH:s officiella sida med generell information om stöd för studenter med funktionsnedsättning. 
      Efter den fasta texten följer en sektion där du kan ange information om stöd för studenter med funktionsnedsättning som gäller specifikt för denna kursomgång. Du kan informera om kompensatoriskt stöd vid examination eller om annat stöd i studiesituationen. Läs mer om att <a href="https://intra.kth.se/utbildning/utbi/examination/stod-funka" target="_blank">hantera stöd till studenter med funktionsnedsättning</a> (öppnas i ny flik).</p>`,
    },
    permanentDisabilitySubSection: {
      body: `<p><b></b></p>
      <p><b></b> </p>`,
      help: `<p>Under rubriken finns två sektioner. Överst visas en fast text, som inte är redigerbar. Den fasta texten innehåller en webblänk till KTH:s officiella sida med generell information om stöd för studenter med funktionsnedsättning. 
      Efter den fasta texten följer en sektion där du kan ange information om stöd för studenter med funktionsnedsättning som gäller specifikt för denna kursomgång. Du kan informera om kompensatoriskt stöd vid examination eller om annat stöd i studiesituationen. Läs mer om att <a href="https://intra.kth.se/utbildning/utbi/examination/stod-funka" target="_blank">hantera stöd till studenter med funktionsnedsättning</a> (öppnas i ny flik).</p>`,
    },
    possibilityToAddition: {
      body: `<p><b>Möjlighet till plussning</b> beskriver om plussning är möjligt på kursomgången, eventuella villkor för plussning och hur plussning går till.</p>
      <p><b>Informationen hjälper studenten</b> att förstå om det finns möjlighet till plussning på denna kursomgång.</p>`,
      help: `<p>Här beskriver du om det finns möjlighet till plussning på denna kursomgång och i så fall vilka villkor som gäller för det och hur studenten ansöker om att få plussa. Om möjlighet till plussning inte är möjlig för denna kursomgång kan det vara bra att ange detta.</p>`,
    },
    possibilityToCompletion: {
      body: `<p><b>Möjlighet till komplettering</b> beskriver om det finns möjlighet till komplettering på denna kursomgång och om komplettering kan göras endast till betyg E eller till högre betyg.</p>
      <p><b>Informationen hjälper studenten</b> att förstå om det finns möjlighet till komplettering på denna kursomgång och i så fall villkoren för komplettering.</p>`,
      help: `<p>Under rubriken beskriver du om det finns möjlighet till komplettering på denna kursomgång och i så fall vilka villkor som gäller. Beskriv också vad som gäller för kursens moduler.</p>
      <p>För modul med betygsskala A-F måste möjlighet till komplettering från Fx till Godkänt ges. För modul med betygsskala P/F kan det erbjudas av examinator.</p>
      <p>Det kan i många fall vara mer tydligt att istället beskriva möjlighet till komplettering om varje modul under rubriken Examination.</p>`,
    },
    possibilityToCompensate: {
      body: `<p><b>Möjlighet till ersättningsuppgifter</b> beskriver om det finns möjlighet till ersättningsuppgifter på kursomgången och i så fall vad som gäller om studenten missar obligatoriska moment.</p>
      <p><b>Informationen hjälper studenten</b> att planera genomförandet av kursomgången samtidig som den läser en annan kurs. Tydligt beskriven information om möjlighet till ersättningsuppgifter ökar även rättssäkerheten.</p>`,
      help: `<p>Här beskriver du om det finns möjlighet till ersättningsuppgifter på kursomgången. 
      Om det är möjligt beskriver du vad som gäller om studenten missar ett obligatoriskt moment. Det kan gälla i fall studenten missar en aktivitet med obligatorisk närvaro eller uteblir vid ett studiebesök.</p>
      <p>Observera att om annan examinationsform än den ordinarie används i en ersättningsuppgift måste det stå i kursplanens ”Kommentar till examination.</p>`,
    },
    preparations: {
      body: `<p><b>Särskilda förberedelser</b> beskriver vad som är särskilt viktigt för studenten att veta och göra inför kursomgångens start.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursomgångens genomförande.</p>`,
      help: `<p>Här beskriver du vad som är särskilt viktigt för studenten att förbereda sig på. Du kan här uppmana studenten att repetera kunskap från "Särskild behörighet" i kursplanen, repetera viktiga delar från "Rekommenderade förkunskaper", påminna om att beställa viss kurslitteratur i tid eller installera programvara.</p>`,
    },
    prerequisites: {
      body: `<p><b>Rekommenderade förkunskaper</b> beskriver vad läraren förväntar sig att studenten behärskar när kursomgången startar.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilken kunskap som är viktig att vara uppdaterad på när kursomgången startar. Tydligt avgränsad information gör det lättare för studenten att repetera rätt teorier och modeller inför kursen start.</p>
      <p><b>Innehåll hämtas från sidan Inför kursval</b> och kan enbart redigeras via Om kursens administrationsverktyg. Vill du ändra innehållet behöver du spara ditt kurs-PM som utkast och gå till funktionen <a href="REPLACE_WITH_ABOUT_COURSE_ADMIN_LINK" target="_blank">Sidan inför kursval</a> för att redigera texten. Du kan välja att inte inkludera rubriken i ditt kurs-PM.</p>`,
      help: `<p>Här beskriver du vad som är särskilt viktigt för studenten att förbereda sig på. Du kan här uppmana studenten att repetera kunskap från "Särskild behörighet" i kursplanen, repetera viktiga delar från "Rekommenderade förkunskaper", påminna om att beställa viss kurslitteratur i tid eller installera programvara.</p>`,
      link: '/kursinfoadmin/kurser/kurs/edit/<REPLACE_WITH_COURSECODE>?l=sv',
    },
    reportingResults: {
      body: `<p><b>Resultatrapportering</b> beskriver när och hur registrering av studenternas resultat och betyg går till, samt var studenten kan ta del av informationen.</p>
      <p><b>Informationen hjälper studenten</b> så att den vet när och hur den kan få tillgång till resultat och betyg. Studenten kan då ta höjd för eventuella omtentor i sin planering. För studenten är det också viktigt att känna trygghet i att den kommer vara berättigad till fortsatt studiemedel.</p>`,
      help: `<p>Här beskriver du hur resultatrapporteringen går till på kursomgången. Informationen är särskilt viktig om resultatrapportering på denna kursomgång skiljer sig från ordinarie rutiner, t.ex. om kursomgången går över flera terminer eller om resultat på hela kursen kan dröja längre än normalt. 
      Studenten ska normalt sett kunna förvänta sig att få resultat senast tre veckor eller femton arbetsdagar efter provtillfället.</p>`,
    },
    scheduleDetails: {
      body: `<p><b>Detaljplanering</b> är en översikt av kursomgångens planerade läraktiviteter och examinationstillfällen och innehåller information om aktiviteterna och vad studenten behöver förbereda inför varje aktivitet.</p>
      <p><b>Informationen hjälper studenten</b> att planera sina studier och genomföra kursomgången på ett effektivt sätt.</p>`,
      help: `<p>Här beskriver du vilka läraktiviteter och examinationstillfällen som planeras under kursen. Beskriv aktiviteternas ordning, dess innehåll och vilka förberedelser som rekommenderas inför varje aktivitet.</p>
      <p>Förberedelser kan vara kapitel och andra referenser till kurslitteratur eller webbsidor, men det kan också vara att installera programvara eller annan praktisk förberedelse</p>`,
    },
    software: {
      body: `<p><b>Programvara</b> beskriver vilken programvara och version av programvaran som ska användas under kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att få tillgång till rätt programvara inför kursomgångens start</p>`,
      help: `<p>Här beskriver du om någon specifik programvara, inklusive version, används. Ange även referenser eller webblänkar till var programvaran finns att hämta, instruktioner och installationsanvisningar om sådana finns på annan plats. 
      Ange annars instruktioner och installationsanvisningar under denna rubrik.</p>`,
    },
    teacher: {
      body: `<p><b>Lärare</b> innehåller kontaktinformation till personer som har rollen lärare under denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> med kontaktuppgifter till lärare under kursomgången.</p>
      <p><b>Innehåll hämtas från Kopps</b> och kan redigeras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet</a> (Båda länkarna öppnas i ny flik).</p>`,
    },
  },
  staticMemoBodyByUserLang: {
    permanentDisability: `<p>Om du har en funktionsnedsättning kan du få stöd via Funka:</p>
  <p><a href="https://www.kth.se/student/stod/studier/funktionsnedsattning/funka">Funka- stöd för studenter med funktionsnedsättningar</a></p>`,
  },
  pagesCreateNewPm: [
    {
      title: 'Välj kursomgång',
      intro: `Börja med att välja kursomgång för det kurs-PM som ska publiceras (steg 1 av 3). I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. 
      I sista steget (3 av 3) ges möjlighet att först granska kurs-PM och sedan publicera det som en undersida till: Om kursen/ Förbereda och gå kurs.`,
    },
    {
      title: 'Redigera kurs-PM',
      intro: '',
    },
    {
      title: 'Granska och publicera',
      intro: '',
    },
  ],
  pagesChangePublishedPm: [
    {
      title: 'Välj kurs-PM',
      intro: `Börja med att välja termin och sedan det kurs-PM som ska ändras (steg 1 av 3).
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) ges möjlighet att först granska kurs-PM och sedan publicera en ny version av kurs-PM på sidan: Om kursen/ Förbereda och gå kurs.`,
    },
    {
      title: 'Redigera kurs-PM',
      intro: '',
    },
    {
      title: 'Granska och publicera',
      intro: '',
    },
  ],
  sectionsLabels: {
    contentAndOutcomes: 'Innehåll och lärandemål',
    prep: 'Förberedelser inför kursstart',
    reqToFinal: 'Examination och slutförande',
    extra: 'Ytterligare information',
    contacts: 'Kontakter',
    asterisk: 'Rubriker markerade med en asterisk ( * ) kommer från kursplan version ',
  },
  pageTitles: {
    new: 'Skapa och publicera kurs-PM',
    published: 'Ändra publicerat kurs-PM',
  },
  actionModals: {
    changeLadokRoundApplicationCodes: {
      header: 'Ändra kurstillfällen',
      body: '',
      btnClose: 'Avbryt',
      btnConfirm: 'Spara',
    },
    infoCancel: {
      header: 'Avsluta med utkast',
      body: `Utkastet är sparat.
        <br/>
        <br/>
          Du hittar utkastet i föregående steg (steg 1) under rubriken Välj kurs-PM. Där kan du välja att fortsätta redigera utkastet eller att radera det.
        <br/>
        <br/>
        Vill du fortsätta att avsluta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avsluta',
    },
    infoFinish: {
      header: 'Avsluta',
      body: `Utkast sparas först i steg 2: Redigera kurs-PM.
        <br/>
        <br/>
        I detta steg, steg 1, visas sparade utkast under rubriken: Välj kurs-PM. Här kan du sedan välja att radera utkastet eller att fortsätta redigera.
        <br/>
        <br/>
        Vill du fortsätta att avsluta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avsluta',
    },
    infoSaveAndFinish: {
      header: 'Avsluta med utkast',
      body: `Utkastet är sparat.
        <br/>
        <br/>
        Du hittar utkastet i föregående steg (steg 1) under rubriken Välj kurs-PM. Där kan du välja att fortsätta redigera utkastet eller att radera det.
        <br/>
        <br/>
        Vill du fortsätta att avsluta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avsluta',
    },
    infoPublish: {
      header: 'Att tänka på innan du publicerar!',
      body: `Kurs-PM kommer att publiceras som en undersida till: Om kursen/ Förbereda och gå kurs.
        <br/>
        <br/>
        Vill du fortsätta att publicera?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt publicera',
    },
    infoPublished: {
      header: 'Att tänka på innan du publicerar!',
      body: `En ny version av Kurs-PM kommer att publiceras som en undersida till: Om kursen /Förbereda och gå kurs.
        <br/>
        <br/>
        Vill du fortsätta att publicera?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt publicera',
    },
    infoRemove: {
      header: 'Att tänka på innan du raderar utkastet!',
      body: `Radera utkast kan inte ångras. Utkastet kommer att försvinna.
      <br/><br/>
      Vill du fortsätta radera utkastet?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera',
    },
    infoRemoveCourseRound: {
      header: 'Att tänka på innan du raderar kurstillfällen!',
      body: `Radera kurstillfällen kan inte ångras. Kurstillfällen kommer att försvinna.
      <br/><br/>
      Vill du fortsätta radera utkastet?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera',
    },
    newSectionRemove: {
      header: 'Att tänka på innan du ta bort en tillagd rubrik!',
      body: `Rubriken med innehåll kommer att raderas och kan inte återskapas.
      <br/><br/>
      Vill du fortsätta att radera den tillagda rubriken?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt radera',
    },
    rebuildDraftOfPublished: {
      header: 'Att tänka på innan du återgår till senast publicerad version!',
      body: `Om du återgår till den senaste publicerade versionen kommmer dina  ändringar att försvinna.
      <br/><br/>
      Vill du återgå till den senaste publicerade versionen?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, återgå till senast publicerad version',
    },
  },
  info: {
    chooseSavedDraft: 'Sparade utkast',
    createNew: 'Ny kursomgång',
    choosePublishedMemo: 'Välj kurs-PM',
    chooseSemester: {
      label: 'Välj termin',
      header: 'Välj termin',
      body: '<p>Börja med att välja termin och sedan det kurs-PM som ska ändras.</p>',
    },
    chooseRound: {
      header: 'Välj kursomgång',
      body: `<p>Välj alla kurstillfällen som ingår i kursomgången. 
      Studenter är antagna till ett kurstillfälle. 
      Programstudenter, betalande studenter och fristående studenter antas till olika kurstillfällen men kan utbildas i samma kursomgång. 
      Kurstillfällen ska alltså grupperas ihop till en kursomgång. Kursomgången är ett praktiskt genomförande av en kurs. 
      Kursomgången har engemensam starttidpunkt, gemensam kurstakt och normalt gemensam undervisning för en studentgrupp. 
      Schemat läggs per kursomgång, kurs-PM utformas per kursomgång och kursanalys genomförs per kursomgång.</p>`,
      addRounds: {
        label: 'Markera det eller de kurstillfällen som du vill lägga till eller ta bort:',
        infoText: 'Kurstillfällena listade saknar ett publicerat kurs-pm eller utkast',
      },
      availableRounds: {
        label: 'Markera ett eller flera kurstillfällen som ingår i kursomgången:',
        infoText: 'Kurstillfällena listade saknar ett publicerat kurs-pm eller utkast',
      },
      existedDrafts: {
        label: 'Välj det utkast du vill fortsätta att redigera:',
        infoText: 'Utkasten listade är sparade men ej publicerade',
      },
      publishedMemos: {
        label: 'Välj det kurs-PM du vill redigera: ',
        infoText: 'Kurs-PM listade är publicerade',
      },
    },
    chooseMemo: {
      header: 'Välj kurs-PM',
      body: `<p>Här visas de kurs-PM som går att ändra. Ett kurs-PM kan ändras upp till ett år efter att kursen avslutades.</p><p>Observera att kurs-PM endast bör ändras i undantagsfall vid uppenbara felaktigheter eller förändringar i kursens upplägg.</p>`,
    },
    createFrom: {
      labelBasedOn: 'Utgå från:',
      labelAllPrevMemos: 'Välj kurs-PM att kopiera:',
      infoTextForMemos: 'Listade Kurs-PM är publicerade för tidigare kursomgångar',
      basedOnStandard: 'Tom KTH-mall för kurs-PM',
      basedOnAnotherMemo: 'Kopia av kurs-PM från en tidigare kursomgång',
    },
    publishedHasDraft: ' - Utkast',
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    noRoundsToAdd:
      'Det finns inga kurstillfällen för denna termin som inte redan har ett publicerat kurs-pm eller ett utkast till ett kurs-pm.',
    noCourseRoundsAvailable:
      'Samtliga kurstillfällen för denna termin ingår redan i en kursomgång som har ett publicerat kurs-PM eller utkast. Se sparade utkast på denna sida eller publicerade kurs-PM på sidan Förbereda och gå kurs/Kurs-PM.',
    noSavedDrafts: 'Det finns inga sparade utkast.',
    noSemesterAvailable:
      'Det finns inga terminer att välja eftersom det saknas aktuella eller kommande kursomgångar för denna kurs. Kontrollera i systemet Kopps om du förväntar dig kursomgångar att skriva kurs-PM för.',
    noPrevPublishedAvailable: 'Det finns inga publicerade kurs-PM tidigare kursomgångar.',
    noPublishedMemos: 'Det finns inga publicerade kurs-PM för denna, föregående eller kommande termin.',
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Lägg till rubrik till ',
    btnClose: 'Stäng',
    btnRemove: 'Radera utkast',
    btnRemoveUnpublishedChanges: 'Radera utkast',
    btnRemoveHeading: 'Ta bort tillagd rubrik',
    btnFinish: 'Avbryt',
    btnSaveAndFinish: 'Avsluta med utkast',
    closeEditor: 'Stäng redigeringsläge',
    saveAndCloseEditor: 'Spara och stäng',
    preview: 'Granska',
    previewPdf: 'Granska PDF',
    edit: 'Redigera',
    cancel: 'Avsluta med utkast',
    save: 'Spara',
    saveDraft: 'Spara utkast',
    publish: 'Publicera',
    goToRounds: 'Välj kursomgång',
    goToMemos: 'Välj kurs-PM',
    save_and_cancel: 'Spara utkast och avsluta',
    btn_copy: 'Kopiera länk till utkast',
    showGuidance: 'Visa vägledning',
  },
  extraInfo: {
    aboutMemoLanguage: {
      sv: `Språket för kurs-PM är på svenska eftersom alla kurstillfällen som valdes när kurs-PM skapades är svenska. 
        Det går ej att lägga till ett engelskt kurstillfälle nedan för det kräver att kurs-PM:s språk är engelska. 
        Om du ändå vill inkludera engelska kurstillfällen behöver du i stället radera utkastet för detta kurs-PM och börja om (språket för kurs-PM kommer då bli på engelska).`,
      en: `Språket för kurs-PM är på engelska eftersom minst ett av kurstillfällena som valdes när kurs-pm skapades är engelskt. 
      Det går att lägga till både svenska och engelska kurstillfällen nedan.`,
    },
    cannotMergeLanguage: 'Går ej att välja, se ovan: Språk kurs-PM.',
    commentChanges: 'Ange alla ändringar i denna version (obligatorisk):',
    contentHeaders: {
      title: 'Rubriker',
      intro: `<p>Alla fasta och valbara rubriker i detta kurs-PM visas nedan. Rubrikerna är grupperade i fem sektioner; "Innehåll och lärandemål", "Förberedelser inför kursstart", "Examination och slutförande", "Ytterligare information" and "Kontakter".</p>
		<p>Expandera sektionen för att se vilka rubriker som ingår i den. Varje rubrik är en länk som snabbt tar dig till rubriken och dess innehåll. Använd länkarna för att snabbt navigera i detta kurs-PM.</p>
		<p>Ett överstruket öga till höger om rubriken innebär att rubriken och dess innehåll inte kommer att inkluderas i det publicerade kurs-PM:et.</p>`,
    },
    labelStartDate: 'Startdatum',
    // hasSavedDraft: 'Finns utkast kurs-PM',
    mandatory: 'Obligatorisk',
    memoLanguage: {
      label: 'Språk kurs-PM',
      sv: 'Svenska',
      en: 'Engelska',
    },
    season: {
      1: 'VT ',
      2: 'HT ',
    },
    summaryIntroductionHelp: {
      titleMain: 'Introduktion och hjälp',
    },
  },
  alerts: {
    autoSaved: 'Sparat utkast',
    autoSavedTemporary: 'Ändringar sparade temporärt inför publicering.',
    addedRoundId: 'Kurstillfällen har ändrats',
    errorEmptyHeading: 'Du behöver ange ett namn på rubriken (se markering i rött ovan)',
    errKoppsRounds:
      'Kunde inte hämta information om kursomgångar på grund av fel i Kopps. Ladda om sidan eller kontakta IT-support.',
    errNoChosen:
      'Du måste välja ett utkast eller minst ett kurstillfälle för att kunna gå vidare till nästa steg Redigera kurs-PM.',
    errNoChosenTemplate:
      'Du måste välja ett kurs-PM att kopiera (se röd markering nedan) för att kunna gå vidare till: Redigera kurs-PM',
    errNoInPublishedChosen: 'Du måste välja ett kurs-PM för att kunna gå vidare till Redigera',
    errWhileDeleting:
      'Det gick inte att ta bort utkasten på grund av systemfel. Försök igen eller kontakta IT-support.',
    errWhilePublishing:
      'Det gick inte att publicera utkasten på grund av systemfel. Försök igen eller kontakta IT-support.',
    errWhileSaving: 'Det gick inte att spara utkast på grund av systemfel. Försök igen eller kontakta IT-support.',
    infoAboutFreshData: 'Information som hämtas från kursplan och kontakter har uppdaterats automatiskt.',
    // Viss information som hämtas har ändrats i källsystemen sedan förra versionen av kurs-pm publicerades. Den uppdaterad informationen visas nedan.
    infoRebuildDraft: 'Kurs-PM nedan har återställts till den senaste publicerade versionen.',
    infoStartAgain: 'Det finns ändringar som ej publicerats. Du kan',
    linkToRefreshData: 'återgå till senaste publicerade versionen av kurs-PM ',
    removedAddedHeading: 'Tillagd rubrik har tagits bort',
    removedEmptyHeading: 'Tillagd rubrik har tagits bort eftersom det saknas rubrik och innehåll',
    syllabusUpdated:
      'Information från kursplan och kontaktinformation har uppdaterats med den senaste giltiga informationen i utkastet nedan.',
    warnFillInCommentAboutChanges:
      'Du behöver fylla i obligatoriska fält (markerade i rött nedan) för att gå vidare till: Granska och publicera',
    warnReplacePm:
      'Observera: publicering av nytt uppladdat kurs-PM kommer att ersätta befintligt kurs-PM (se "Välj kursomgång" nedan)',
  },
  sideMenuLabels: {
    directory: 'Kurs- och programkatalogen',
    aboutCourse: 'Om kursen',
    beforeChoosingCourse: 'Inför kursval',
    courseMemo: 'Förbereda och gå kurs',
    finishCourse: 'Slutföra ej avklarad kurs',
    courseDevelopment: 'Kursens utveckling',
    archive: 'Arkiv',
    noLinksInPreview: 'Länkar i menyn fungerar inte i granska-läge',
    aboutCourseMemos: 'Kurs-PM',
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Undervisningsspråk',
    offeredByTitle: 'Kursen ges av',
    roundsTitle: 'Kursomgång',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
    startdate: 'Startdatum',
  },
  courseMemoLinksLabels: {
    versionTitle: 'Version kurs-PM',
    latest: 'Senaste:',
    courseMemoArchiveLabel: 'Arkiv för kurs-PM',
    courseMemoPrint: 'Skriv ut eller spara',
    linkCourseMemoPrint: 'Skriv ut eller spara kurs-PM',
    courseMemoModal: 'Länk fungerar inte i granska-läge',
    btnCloseModal: 'Stäng',
    syllabus: 'Kursplan',
    syllabusInformation: 'information hämtas från',
    syllabusLinkStart: 'Kursplan',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
    inDevelopment: 'Under utveckling',
  },
  courseLinksLabels: {
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
    linkHeaderTitle: 'Relaterad information',
    administrateYouStudy: 'Administrera dina studier',
    courseAndExamination: 'Kurs och examination',
    rightsAndResponsibilities: 'Rättigheter och skyldigheter',
  },
  courseContactsLabels: {
    courseContactsTitle: 'Kontakter',
    communicationWithTeachersTitle: 'Kommunikation i kursen',
    courseCoordinatorTitle: 'Kursansvarig',
    teacherTitle: 'Lärare',
    examinerTitle: 'Examinator',
    otherContactsTitle: 'Övriga kontakter',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
  },
  courseImage: {
    Arkitektur: 'Picture_by_MainFieldOfStudy_01_Architecture.jpg',
    Bioteknik: 'Picture_by_MainFieldOfStudy_02_Biotechnology.jpg',
    'Datalogi och datateknik': 'Picture_by_MainFieldOfStudy_03_Computer_Science.jpg',
    Elektroteknik: 'Picture_by_MainFieldOfStudy_04_Electrical_Engineering.jpg',
    Fysik: 'Picture_by_MainFieldOfStudy_05_Physics.jpg',
    'Industriell ekonomi': 'Picture_by_MainFieldOfStudy_06_Industrial_Management.jpg',
    Informationsteknik: 'Picture_by_MainFieldOfStudy_07_Information_Technology.jpg',
    'Informations- och kommunikationsteknik': 'Picture_by_MainFieldOfStudy_08_Information_Communication.jpg',
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
    default: 'Picture_by_MainFieldOfStudy_26_Default_picture.jpg',
  },
}
