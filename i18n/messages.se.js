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

    lang_block_id: '1.871898',
    locale_text: 'Denna sida på svenska',
    main_site_name: 'Administrera Om kursen ',
    site_name: 'Administration av kurs-PM',
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
    fetched: 'Hämtats',
    '(c)': 'från kursgemensam information',
    '(r)': 'från kurstillfällesinformation',
    '(s)': 'från kursplan',
    errorEmptyHeading: 'Du måste ange en rubrik',
    mandatory: 'Inkluderas alltid',
    mandatoryAndEditable: 'Inkluderas alltid',
    mandatoryForSome: 'Inkluderas för vissa kurser',
    includeInMemo: {
      section: 'Inkludera',
      subSection: 'Inkludera ytterligare avsnitt',
    },
    noInfoYet: {
      section:
        'Inget innehåll är inlagt. Välj Redigera för att lägga in innehåll eller välj att inte inkludera rubriken.',
      subSection:
        'Inget innehåll är inlagt. Välj Redigera för att lägga in innehåll eller välj att inte inkludera avsnittet.',
    },
    // includera rubrik
    notIncludedInMemoYet: {
      section: 'Innehåll finns inlagt. Välj: Inkludera för att visa rubrik med innehåll i kurs-PM',
      subSection: 'Innehåll finns inlagt. Välj: Inkludera avsnitt för att visa innehållet i kurs-PM',
    },
    nothingFetched: {
      mandatoryAndEditable: `Inget innehåll är inlagt. Rubriken är obligatorisk och kommer att inkluderas i kurs-PM. Välj Redigera för att lägga in innehåll.`,
      mandatory: `Inget innehåll fanns att hämta. Rubriken är obligatorisk och kommer att inkluderas i kurs-PM. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan.`,
      mandatoryForSome: `Inget innehåll fanns att hämta. Rubriken gäller således inte för den här kursen och kommer därför inte att inkluderas i kurs-PM.`,
      optional: `Inget innehåll fanns att hämta. Instruktioner om hur man ändrar hämtad information ges i informationsikonen ovan. Du kan också välja att inte inkludera rubriken.`,
    },
    insertedSubSection: '(Avsnittet nedan ingår inte i kursplanen)',
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
    teacherAssistants: 'Lärarassistenter',
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: `<p><b>Övriga föreskrifter</b> beskriver andra föreskrifter i kursplanen som inte ryms under övriga rubriker i kursplanen. 
      Det kan t.ex. vara om kursen inte är examensgrundande, om deltagande innebär krav studier på annat campus eller ort eller om kursen innehåller inslag som kan innebära kostnad utöver kostnad för litteratur och annat undervisningsmaterial.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursens genomförande beroende på innehållet under "Övriga föreskrifter".</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Övriga föreskrifter kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>
      <p>Om det inte finns något innehåll kommer rubriken inte visas i det publicerade kurs-PM:et.</p>`,
    },
    commentAboutMadeChanges: {
      body: `<p><b>Gjorda ändringar</b> utgör en logg av de ändringar som gjorts i ett publicerat kurs-PM. Informationen kommer inte att visas publikt. Gjorda ändringar ska innefatta kort vilka rubriker som ändrats och varför det ändrats. Systemet sparar datum och tidpunkt för varje publicerad ändring.</p>
      <p><b>Rubriken hjälper KTH</b> att lättare hitta och förstå vilka ändringar som gjorts i ett publicerat kurs-PM.</p>`,
      help: `<p></p>
      <p></p>`,
    },
    communicationDuringCourse: {
      body: `<p><b>Kommunikation i kursen</b> </p>
			<p><b>Informationen hjälper studenten</b> att förstå hur den ska kommunicera med lärare och annan relevant personal inför och under kursomgångens genomförande. Med tydligt beskrivna instruktioner kommer kommunikationen blir mer  effektiv för både studenter och lärare på kursen.</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om "Kommunikation i kursen" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Kommunikation i kursen" beskriver du kortfattat hur kommunikation ska gå till inför och under kursomgångens genomförande. Du kan t.ex. hänvisa till nämnda lärare innan kursens start och till Canvas för kommunikation under kursens gång. Om olika frågor ska kommuniceras på olika sätt kan du övergripande beskriva hur man ska kommunicera om respektive fråga.</p>
			<p>Skriv inte kontaktinformation under denna rubrik. Referera istället till kontaktinformationen under rubrikerna "Kursansvarig", "Lärare", "Lärarassistenter", "Examinator" och "Övriga kontakter".</p>
			<p>Om det inte finns anledning att informera om kommunikation i kursen för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    courseContent: {
      body: `<p><b>Kursinnehåll</b> beskriver ämnesinnehållet och de generella färdigheter som behandlas eller tränas i kursen.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka begrepp, ämnen, färdigheter m.m. som den behöver läsa in sig på inför och under kursen. 
      Kursinnehållet hjälper på så sätt studenten att förbereda sig inför och under kursen.</p>
      <p><b>Innehållet redigeras</b>  i utbildningsdatabasen Kopps. 
      Det finns tydliga riktlinjer för hur Kursinnehåll kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan 
      <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    courseCoordinator: {
      body: `<p><b>Kursansvarig</b> beskriver kontaktinformation till personer som har rollen kursansvarig på denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vem och hur den ska kontakta angående frågor eller synpunkter till kursansvarig för kursomgången.</p>
	  <p><b>Innehållet redigeras</b> i utbildningsdatabasen <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. Kursansvarig ändras av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik.</p>`,
    },
    ethicalApproach: {
      body: `<p><b>Etiskt förhållningssätt</b> beskriver KTH:s etiska värdegrund under studier samt instruktioner om vad som är tillåtet och inte tillåtet under kursomgångens genomförande.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilka etiska värderingar som gäller på kursen, vilka skyldigheter den har och vilket reglemente den har att rätta sig efter under kursomgångens genomförande. 
      Tydligt beskrivna etiska riktlinjer ökar studentens förtroende för KTH:s utbildning och hjälper den att undvika brott mot kursens värdegrund och reglemente.</p>
      <p><b>Redigera kursspecifikt innehåll</b> genom att klicka på knappen "Redigera”. Ange information om etiskt förhållningssätt i inmatningsfältet och klicka i "Inkludera ytterligare avsnitt" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
    },
    ethicalApproachSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`,
      help: `<p>Under rubriken "Etiskt förhållningssätt" finns två sektioner. 
      Överst visas en fast text från kursens kursplan som kommer att publiceras i detta kurs-PM. 
      Texten är generella etiska riktlinjer för alla kurser på KTH och dessa är inte redigerbara.</p>
      <p>Efter sektionen med den fasta texten följer en sektion där du kan ange information om etiskt förhållningssätt som är specifik för eller extra relevant i denna kursomgång.
       Du kan beskriva om det finns särskilda regler för t.ex. grupparbete, hemuppgifter, programmering m.m. 
       Läs mer om KTH:s <a href="https://intra.kth.se/polopoly_fs/1.738196.1562741233!/L%C3%A4sanvisningar%20till%20etisk%20policy%20f%C3%B6r%20KTH%20FR%202017-02-08.pdf" target="_blank">etiska policy</a> för att få stöd för att formulera etiska riktlinjer för just denna kursomgång.</p>
      <p>Du kan också ta hjälp av <a href="https://www.kth.se/eecs/utbildning/hederskodex" target="_blank">EECS-skolans hederskodex för lärare och studenter</a> för att få ytterligare hjälp till att formulera etiska riktlinjer för just denna kursomgång. 
      Om denna kurs ges av EECS-skolan kan du infoga en webblänk till denna sida.</p>
      <p>Om det inte finns anledning att informera om etiska riktlinjer som är specifik för eller extra relevant i denna  kursomgång låter du den andra redigerbara sektionen vara tom.</p>`,
    },
    equipment: {
      body: `<p><b>Utrustning</b> beskriver vilken utrustning som normalt behövs för att kunna följa kursomgången och som inte tillhandahålls av KTH. 
      Skrivdon och litteratur räknas inte till utrustning.</p>
      <p><b>Informationen hjälper studenten</b> att införskaffa rätt utrustning inför kursomgångens start. 
      Därför bör uppgifterna finnas tillgängliga minst 8 veckor före kursstart.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Utrustning" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Om det finns generell information om utrustning på kursen i Kopps kommer den informationen att hämtas automatiskt till detta kurs-PM. 
      Du kan ändra informationen för detta kurs-PM, men det kommer inte att automatiskt överföras till Kopps eller till något annat kurs-PM. 
      Generell information om "Utrustning" på kursen ändras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. 
      Båda länkarna öppnas i ny flik. Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Utrustning" beskriver du vilken utrustning som studenten behöver för att genomföra kursen, men som inte tillhandahålls av KTH. 
      Om du valt att skapa ett nytt kurs-PM kommer information att hämtas automatiskt från den kursgemensamma informationen om utrustning i Kopps. 
      Du kan välja att behålla den hämtade informationen eller beskriva utrustning som är specifik för denna kursomgång. 
      Du kan då ersätta den hämtade texten med en egen beskrivning som anges i inmatningsfältet.</p>
      <p>Om utrustning inte är nödvändig på denna kurs låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    examination: {
      body: `<p><b>Examination</b> beskriver hur kursen examineras och detaljer om de examinerande momenten.</p>
      <p><b>Informationen hjälper studenten</b> att planera kursomgångens genomförande och att förbereda sig inför kursomgångens olika examinationsmoment.</p>
      <p><b>Innehållet redigeras</b> dels i utbildningsdatabaserna Ladok och Kopps avseende de fasta texterna. Normalt sett kan den fasta texten inte ändras. Det finns tydliga riktlinjer för hur examination kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>
      <p><b>Redigera examinationsdetaljer</b> genom att ange information om examinationens moduler i inmatningsfältet och klicka i "Inkludera ytterligare avsnitt" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
    },
    examinationSubSection: {
      body: `<p><b>Informationen syftar till: …</b></p>
      <p><b>Rubriken hjälper studenter:</b> </p>`,
      help: `<p>Under rubriken "Examination" finns två sektioner. Överst visas en fast text från kursens kursplan som kommer att publiceras i detta kurs-PM.</p>
      <p>Efter sektionen med den fasta texten följer en sektion där du ska beskriva kursomgångens examination i detalj. 
      Här ska du utveckla varje modul i examinationen. Om du har valt att skapa ett nytt kurs-PM som inte är en kopia eller ny version av ett tidigare kurs-PM kommer systemet automatiskt skapa underrubriker av varje modul i examinationen. 
      Överväg att beskriva följande under varje underrubrik:</p>
      <p>- hur examinationen går till</p><p>- vilka delar som ingår</p><p>- vad som är obligatoriskt</p><p>- vilka deadlines som gäller</p>
      <p>- vilka hjälpmedel som får användas</p><p>- vad som gäller för samarbete och grupparbete </p><p>- ...och annan avgörande information som har betydelse för examinationen.</p>
      <p>I den andra sektionen under rubriken "Examination" kan du också beskriva om det finns alternativa sätt att klara av varje modul, t.ex. genom kontrollskrivningar, om bonuspoäng kan användas till examinationen och liknande.</p>
      <p>Observera att förutsättningarna för examination inte får ändras i förhållande till kursplan och första publicerade kurs-PM. 
      Tänk därför på att vara väldigt restriktiv med eventuella ändringar under rubriken "Examination" efter att detta kurs-PM publicerats första gången. Tänk också på att granska och säkerställa det redigerbara innehållet under rubriken ”Examination” om du har kopierat innehållet i detta kurs-PM från ett tidigare publicerat kurs-PM. 
      Den fasta texten motsvarar alltid den gällande kursplanen, även för kopierade kurs-PM.</p>
      <p>Det är inte obligatoriskt att använda systemets föreslagna rubriker som struktur för beskrivning av examinationens detaljer. Om du finner en annan struktur bättre lämpad ersätter du bara systemets rubriker med dina egna.</p>
      <p>Instruktioner och uppgifter för varje examination bör beskrivas i Canvas eller motsvarande lärplattform. 
      Deadlines samt tidpunkt och plats för examination kan dock skrivas under rubriken "Detaljplanering" i detta kurs-PM för att ge studenten en överblicka över samtliga aktiviteter på denna kursomgång. </p>`,
    },
    examiner: {
      body: `<p><b>Examinator</b> beskriver kontaktinformation till personer som har rollen examinator på denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vem och hur den ska kontakta angående frågor eller synpunkter till examinator för kursomgången.</p>
	  <p><b>Innehållet redigeras</b> i utbildningsdatabasen <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. Examinator ändras av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik.</p>`,
    },
    extraHeaders1: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Innehåll och lärandemål".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Skriv information som är relaterat till "Innehåll och lärandemål", men som inte passar i någon av de ordinarie rubrikerna, i en egen tillagd rubrik. Exempel på sådan information kan vara "Nyckelbegrepp", "Koppling till examensmål" eller "Kursens pedagogiska upplägg". Du kan namnge rubriken som du själv önskar för att passa just din kurs.</p>
			<p>Om du inte längre vill visa en egen tillagd rubrik kan du antingen dölja rubriken med innehåll genom att klicka ur "Inkludera rubrik" eller ta bort rubrik med innehåll permanent genom att klicka på knappen "Ta bort tillagd rubrik" och bekräfta.</p>`,
    },
    extraHeaders2: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Förbereda inför kursstart".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Skriv information som är relaterat till "Förbereda inför kursstart", men som inte passar i någon av de ordinarie rubrikerna, i en egen tillagd rubrik. Exempel på sådan information kan vara "Särskild behörighet", "Kursregistrering" eller "Lärplattform". Du kan namnge rubriken som du själv önskar för att passa just din kurs.</p>
			<p>Om du inte längre vill visa en egen tillagd rubrik kan du antingen dölja rubriken med innehåll genom att klicka ur "Inkludera rubrik" eller ta bort rubrik med innehåll permanent genom att klicka på knappen "Ta bort tillagd rubrik" och bekräfta.</p>`,
    },
    extraHeaders3: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Examination och slutförande".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Skriv information som är relaterat till "Examination och slutförande", men som inte passar i någon av de ordinarie rubrikerna, i en egen tillagd rubrik. Exempel på sådan information kan vara "Överklagan" eller "Länk till gamla KS och gamla tentor". Du kan namnge rubriken som du själv önskar för att passa just din kurs.</p>
			<p>Om du inte längre vill visa en egen tillagd rubrik kan du antingen dölja rubriken med innehåll genom att klicka ur "Inkludera rubrik" eller ta bort rubrik med innehåll permanent genom att klicka på knappen "Ta bort tillagd rubrik" och bekräfta.</p>`,
    },
    extraHeaders4: {
      body: `<p><b>Information under en tillagd rubrik</b> kan hjälpa studenter på denna kursomgång att förbereda sig på eller planera för kursen med hjälp av information som inte passar in under någon av kurs-PM:ets ordinarie rubriker relaterade till "Ytterligare information".</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange rubrik i fältet "Ange rubrik" och skriv information i inmatningsfältet under och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet.</p>
			<p>För att ta bort en tillagd rubrik klickar du på knappen "Redigera" och klickar därefter på knappen "Ta bort tillagd rubrik". Bekräfta att du vill ta bort rubrik och radera innehållet.</p>`,
      help: `<p>Skriv information som är relaterat till "Ytterligare information", men som inte passar i någon av de ordinarie rubrikerna, i en egen tillagd rubrik. Exempel på sådan information kan vara "Om kursen ändras eller avvecklas", "Kursvärdering och kursanalys" eller "Kartor till undervisningssalar". Du kan namnge rubriken som du själv önskar för att passa just din kurs.</p>
			<p>Om du inte längre vill visa en egen tillagd rubrik kan du antingen dölja rubriken med innehåll genom att klicka ur "Inkludera rubrik" eller ta bort rubrik med innehåll permanent genom att klicka på knappen "Ta bort tillagd rubrik" och bekräfta.</p>`,
    },
    gradingCriteria: {
      body: `<p><b>Målrelaterade betygskriterier/bedömningskriterier</b> ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål.</p>
      <p><b>Informationen hjälper studenten</b> att förstå hur betygskriterierna/bedömningskriterierna relaterar till lärandemålen och med det vad den behöver göra och kunna för att uppnå respektive betyg på kursen. Att tydligt beskriva betygskriterierna bidrar även till att motivera studenten.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om "Målrelaterade betygskriterier/bedömningskriterier" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Betygskriterierna ska koppla betygsstegen till nivåer av uppfyllelse av kursens lärandemål, där godkänt betyg ska innebära en grundläggande uppfyllelse av målen. Betygskriterier för högre nivåer kan exempelvis gälla kvaliteten på utförandet, svårighetsgraden, hur olika delar av kursinnehållet kombineras och nivå i Blooms taxonomi.</p>
      <p>Examinationen ska vara tydligt kopplad till betygskriterierna. Om det finns flera examinationsmoment i kursen ska det i anslutning till betygskriterierna framgå vilka lärandemål som examineras i vilket examinationsmoment, hur slutbetyget vägs ihop av delbetyg och hur delbetyg vägs ihop av delbedömningar efter betygskriterierna.</p>
      <p>Läs mer om betygskriterier/bedömningskriterier och hitta konkreta exempel på 
      <a href="https://intra.kth.se/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Målrelaterade betygskriterier</a> (öppnas i ny flik).</p>`,
    },
    gradingScale: {
      body: `<p><b>Betygsskala</b> beskriver betygsskalan för slutbetyg på hela kursen.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilket betyg den kan förvänta sig efter slutförd kurs.</p>
      <p><b>Innehållet kan ej redigeras.</b> Ändring av betygsskala kräver inrättande av ny kurs och kurskod. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    infoForReregisteredStudents: {
      body: `<p><b>Ändringar inför denna kursomgång</b> beskriver relevanta slutsatser från föregående kursvärderingar och kursanalyser samt vilka ändringar som faktiskt har införts till denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att exempelvis förstå vilka förbättringar som gjorts inför kursomgången och på ett högre plan vilket förbättringsarbete i allmänhet som görs på kursen. 
      Informationen kan också uppmärksamma omregistrerade studenter på förändringar från föregående kursomgångar den behöver ta hänsyn till.
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om ändringar inför denna kursomgång i inmatningsfältet och klicka på "Inkludera" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Ändringar inför denna kursomgång" beskriver du vilka ändringar som gjorts på kursen inför denna kursomgång. 
      Det kan också vara viktigt att beskriva relevanta slutsatser från föregående kursvärderingar och kursanalyser som hjälper studenten att prioritera i sin planering och sina förberedelser inför kursomgången. 
      Kurs-PM är ett av flera sätt att informera studenter om resultaten från kursvärderingar och kursanalyser samt eventuella beslut om åtgärder som följer av det.</p>
      <p>Om det inte finns anledning att informera om ändringar inför denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    learningActivities: {
      body: `<p><b>Läraktiviteter</b> beskriver vilka typer av planerade aktiviteter som planerats för kursomgången och vad som är bra för studenten att veta om respektive aktivitetstyp. 
      Läraktivitet definierar vad t.ex. ett seminarium eller en lektion eller en laboration är på just denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå och planera inför kursomgångens aktiviteter och med det göra rätt förberedelser i rätt tid. 
      Innebörden av en viss typ av läraktivitet kan ha olika innebörd på olika kurser. Med väl beskrivna läraktiviteter kan studenten därför få rätt förväntningar på varje typ av läraktivitet.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om läraktiviteter i inmatningsfältet och klicka i "Inkludera" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Läraktiviteter" beskriver du vilka typer av läraktiviteter som är planerade under kursomgången. Ge de olika typerna ett intuitivt och gärna vedertaget begrepp som du sedan använder konsekvent senare i detta kurs-PM. Beskriv vad de olika typerna av läraktiviteter innebär på just denna kursomgång, kortfattat hur de går till och vad som är bra för studenten att känna till om läraktiviteten. 
      Du kan också beskriva hur omfattande läraktiviteterna är i fråga om antal och tid, men också hur de är fördelade över kursomgångens studietid.</p>
      <p>Kursens pedagogiska upplägg kan också beskrivas under "Läraktiviteter" om det har betydelse för studentens planering och förberedelse av kursomgången.
      Om läraktiviteter inte är relevant för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    learningOutcomes: {
      body: `<p><b>Lärandemål</b> ska tydliggöra vilka kunskaper, färdigheter, värderingsförmågor och förhållningssätt som studenten ska visa efter genomgången kurs.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vad den behöver uppnå för att få ett godkänt betyg. Lärandemålen hjälper med det studenten att lägga en plan för kursens genomförande. 
      Efterföljande information i detta kurs-PM relaterar till kursens lärandemål varför det är viktigt att informationen är väl formulerad.</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. Det finns tydliga riktlinjer för hur Lärandemål kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p></p>`,
    },
    literature: {
      body: `<p><b>Kurslitteratur</b> beskriver vilken litteratur som används i kursomgången.</p>
      <p><b>Informationen hjälper studenten</b> att införskaffa rätt kurslitteratur inför kursomgångens start. 
      För studenter med funktionsnedsättning är det viktigt att i god tid veta vilken kurslitteratur som ska gälla för att kunna få den inläst. 
      Därför bör uppgifterna finnas tillgängliga minst 8 veckor före kursstart.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Kurslitteratur" i inmatningsfältet. Om det finns kursgemensamma uppgifter om kurslitteratur i Kopps kommer den informationen hämtas automatiskt till nya kurs-PM. 
      Du kan välja att behålla den informationen i detta kurs-PM eller skriva ny information som endast gäller den kursomgång som detta kurs-PM skrivs för. 
      Information som skrivs för detta kurs-PM kommer inte att automatiskt överföras till Kopps eller något annan kurs-PM. 
      Generell information om "Kurslitteratur" på kursen ändras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
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
      Rubriken kurslitteratur är obligatorisk i kurs-PM och kommer alltid visas i kurs-PM oavsett om det finns relevant kurslitteratur eller inte på kursomgången.</p>`,
    },
    otherContacts: {
      body: `<p><b>Övriga kontakter</b> beskriver kontaktinformation till personer och funktioner som studenten kan behöva komma i kontakt med inför, under eller efter kursomgången och som inte har någon av rollerna examinator, kursansvarig, lärare eller lärarassistenter. Övriga kontakter kan vara kursadministratör, labbhandledare, projekthandledare etc.</p>
			<p><b>Informationen hjälper studenten</b> att förstå vem och hur den ska kontakta angående frågor eller synpunkter som inte ska adresseras rollerna examinator, kursansvarig, lärare eller lärarassistenter.</p>
			<p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om "Övriga kontakter" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Övriga kontakter" beskriver du vilka personer eller funktioner som kan vara relevanta att kontakta under kursomgången. Ange namn, mailadress och/eller telefonnummer. Beskriv kortfattat vilka frågor eller synpunkter de kan kontaktas om.</p>
			<p>Kontakter som redan är beskrivna under rubriker "Examinator", "Kursansvarig", "Lärare" och "Lärarassistenter" ska inte återupprepas under denna rubrik.</p>
			<p>Om övriga kontakter inte är relevanta för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    otherRequirementsForFinalGrade: {
      body: `<p><b>Övriga krav för slutbetyg</b> beskriver ytterligare krav för betyg på hel kurs, utöver vad som anges under rubriken "Examination", t.ex. krav på närvaro.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursens genomförande beroende på innehållet under "Övriga krav för slutbetyg".</p>
      <p><b>Innehållet redigeras</b> i utbildningsdatabasen Kopps. 
      Det finns tydliga riktlinjer för hur "Övriga krav för slutbetyg" kan ändras eftersom informationen är en del av kursplanen. 
      Läs mer om riktlinjer för att ändra innehåll i kursplan på sidan <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (öppnas i ny flik).</p>`,
    },
    permanentDisability: {
      body: `<p><b>Stöd för studenter med funktionsnedsättning</b> beskriver vilka rättigheter och möjligheter som finns för studenter med funktionsnedsättning. Informationen beskriver vilket stöd de kan väntas få under kursomgången och hur de går tillväga för att få stödet.</p>
      <p><b>Informationen hjälper studenten</b> med funktionsnedsättning att förstå hur de kan få rätt stöd för att genomföra kursomgången. 
      Med tydlig information om stöd kan studenter med funktionsnedsättning känna sig trygg och ha förtroende för att den kommer kunna genomföra kursomgången efter sina förutsättningar.</p>
      <p><b>Redigera kursspecifikt innehåll</b> genom att klicka på knappen "Redigera”. Ange information om "Stöd för studenter med funktionsnedsättning" i inmatningsfältetoch klicka i "Inkludera ytterligare avsnitt" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
    },
    permanentDisabilitySubSection: {
      body: `<p><b></b></p>
      <p><b></b> </p>`,
      help: `<p>Under rubriken "Stöd för studenter med funktionsnedsättning" finns två sektioner. Överst visas en fast text, som inte är redigerbar, och som kommer att publiceras i detta kurs-PM. 
      Den fasta texten innehåller en webblänk till KTH:s officiella sida om stöd för studenter med funktionsnedsättning. Där finns generell information om vad studenten bör känna till om stödet, hur studenten går tillväga för att ansöka om särskilt stöd m.m.</p>
      <p>Efter sektionen med den fasta texten följer en sektion där du kan ange information om stöd för studenter med funktionsnedsättning som gäller specifikt för denna kursomgång. 
      Du kan informera om kompensatoriskt stöd vid examination eller om annat stöd i studiesituationen. 
      Läs mer om att <a href="https://intra.kth.se/utbildning/utbi/genomfora-utbildning/hantera-stodinsatser-vid-examination-av-studenter-med-funktionsnedsattning" target="_blank">hantera stödinsatser vid examination av studenter med funktionsnedsättning</a>.</p>
      <p>Om det inte finns anledning att informera om stöd för studenter med funktionsnedsättning som gäller specifikt denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    possibilityToAddition: {
      body: `<p><b>Möjlighet till plussning</b> beskriver om plussning är möjligt på kursomgången, eventuella villkor för plussning och hur plussning går till på kursomgången. 
      KTH:s skolor ska tillåta studenter att plussa betyg på kurs eller kursmoment så långt det befinns lämpligt.</p>
      <p><b>Informationen hjälper studenten</b> att förstå om det finns möjlighet till plussning på denna kursomgång, villkoren som gäller och i så fall hur studenten ska gå till väga för att plussa betyget.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Möjlighet till plussning" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Om det finns kursgemensamma uppgifter om möjlighet till plussning i Kopps kommer den informationen hämtas automatiskt till nya kurs-PM. 
      Du kan välja att behålla den informationen i detta kurs-PM eller skriva ny information som endast gäller den kursomgång som detta kurs-PM skrivs för. 
      Information som skrivs för detta kurs-PM kommer inte att automatiskt överföras till Kopps eller något annan kurs-PM. 
      Generell information om "Möjlighet till plussning" på kursen ändras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Möjlighet till plussning" beskriver du om det finns möjlighet till plussning på denna kursomgång och i så fall vilka villkor som gäller för det och hur studenten ansöker om att få plussa.</p>
      <p>Om du valt att skapa ett nytt kurs-PM kommer information att hämtas automatiskt från den kursgemensamma informationen om möjlighet till plussning i Kopps. Du kan välja att behålla den hämtade informationen eller skriva möjlighet till plussning specifikt för kursomgången som detta kurs-PM gäller för. 
      Du kan då ersätta den hämtade texten med text som anges i inmatningsfältet.</p>
      <p>Om möjlighet till plussning inte är möjlig för denna kursomgång kan det ändå vara bra för studenten att få veta det. 
      Om du trots det inte vill ha med "Möjlighet till plussning" i detta kurs-PM låter du rubriken vara dold.</p>`,
    },
    possibilityToCompletion: {
      body: `<p><b>Möjlighet till komplettering</b> beskriver om det finns möjlighet till komplettering på denna kursomgång och om komplettering kan göras endast till betyg E eller till högre betyg. 
      Alla moment i en kurs som vid examinationen använder en graderad prestations- eller betygsskala ska kunna kompletteras från Fx till godkänt. 
      För moment där betygen Godkänt/Underkänt (P/F) ges, kan komplettering erbjudas om examinator finner det lämpligt.</p>
      <p><b>Informationen hjälper studenten</b> att förstå om det finns möjlighet till komplettering på denna kursomgång och i så fall villkoren för komplettering på denna kursomgång.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. Ange information om "Möjlighet till komplettering" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Om det finns kursgemensamma uppgifter om möjlighet till komplettering i Kopps kommer den informationen hämtas automatiskt till nya kurs-PM. 
      Du kan välja att behålla den informationen i detta kurs-PM eller skriva ny information som endast gäller den kursomgång som detta kurs-PM skrivs för. 
      Information som skrivs för detta kurs-PM kommer inte att automatiskt överföras till Kopps eller något annan kurs-PM. 
      Generell information om "Möjlighet till komplettering" på kursen ändras i <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. 
      Båda länkarna öppnas i ny flik. Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Möjlighet till komplettering" beskriver du om det finns möjlighet till komplettering på denna kursomgång och i så fall vilka villkor som gäller för det. 
      Beskriv också vad som gäller för momenten på kursen. För moment med betygsskala A-F måste möjlighet till komplettering från Fx till godkänt. För moment med betygsskala P/F kan det erbjudas av examinator.</p>
      <p>Om du valt att skapa ett nytt kurs-PM kommer information att hämtas automatiskt från den kursgemensamma informationen om möjlighet till komplettering i Kopps. 
      Du kan välja att behålla den hämtade informationen eller skriva möjlighet till komplettering specifikt för kursomgången som detta kurs-PM gäller för. 
      Du kan då ersätta den hämtade texten med text som anges i inmatningsfältet.</p>
      <p>Det kan i många fall vara mer tydligt att beskriva möjlighet till komplettering om varje moment under respektive underrubrik till rubriken "Examination" längre upp i detta kurs-PM.
      Om möjlighet till komplettering inte är relevant för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    possibilityToCompensate: {
      body: `<p><b>Möjlighet till ersättningsuppgifter</b> beskriver i första hand om det finns möjlighet till ersättningsuppgifter på kursomgången och i så fall vad som gäller om studenten missar obligatoriska moment.</p>
      <p><b>Informationen hjälper studenten</b> att planera genomförandet av kursomgången tillsammans med andra åtaganden, som t.ex. en parallell kurs, genom att den lättare kan göra en sammantagen prioritetsordning av samtliga studentens aktiviteter. 
      Tydligt beskriven information om möjlighet till ersättningsuppgifter ökar även rättssäkerheten.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Visa i kurs-PM”. 
      Ange information om möjlighet till ersättningsuppgifter i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Möjlighet till ersättningsuppgifter" beskriver du om det finns möjlighet till ersättningsuppgifter på kursomgången. 
      Om det är möjligt så beskriver du vad som gäller om studenten missar ett obligatoriskt moment under kursomgången. 
      Det kan vara i fallet då studenten missar en aktivitet med obligatorisk närvaro eller uteblivet studiebesök.</p>
      <p>Observera att om annan examinationsform än den ordinarie används i en ersättningsuppgift måste det stå i kursplanens kommentar till examinationsmoment.</p>
      <p>Om det inte finns anledning att informera om möjlighet till ersättningsuppgifter för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    preparations: {
      body: `<p><b>Särskilda förberedelser</b> beskriver vad som är särskilt viktigt för studenten att veta och göra inför kursomgångens start.</p>
      <p><b>Informationen hjälper studenten</b> att planera och förbereda kursomgångens genomförande, t.ex. genom att köpa kurslitteratur i tid, 
      repetera kunskap från "Särskild behörighet", repetera särskilt viktiga delar av "Rekommenderade förkunskaper", installera programvara och liknande.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Särskilda förberedelser" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Särskilda förberedelser" kan du understryka vad som är särskilt viktigt eller fördelaktigt för studenten att förbereda sig på. Här kan du beskriva vad som är viktigt för studenten att veta och göra inför kursomgångens start. 
      Du kan här uppmana studenten att repetera kunskap från "Särskild behörighet" i kursplanen, repetera viktiga delar från "Rekommenderade förkunskaper", påminna att beställa viss kurslitteratur i tid eller installera programvara m.m.</p>
      <p>Förberedelser i allmänhet ska beskrivas under "Läraktiviteter" om det gäller generella förberedelser inför kursomgångens olika aktivitetstyper eller under "Detaljplanering" om det gäller specifika förberedelser och läsanvisningar inför varje aktivitet i kursomgången. 
      Läs mer om det i vägledning under respektive rubrik.</p>
      <p>Om det inte finns anledning att uppmana studenten om "Särskilda förberedelser" låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    prerequisites: {
      body: `<p><b>Rekommenderade förkunskaper</b> beskriver vad läraren förväntar sig att studenten behärskar när kursen startar.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vilken kunskap som är viktig att vara uppdaterad om när kursomgången startar. 
      Tydligt avgränsad information om "Rekommenderade förkunskaper" gör det lätt för studenten att repetera rätt teorier, modeller etc. i god tid inför kursomgångens start.</p>
      <p><b>Innehållet redigeras</b> Innehållet redigeras i utbildningsdatabasen <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. "Rekommenderade förkunskaper" ändras av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik.</p>`,
    },
    reportingResults: {
      body: `<p><b>Resultatrapportering</b> beskriver hur och när registrering av studenternas resultat på examination och resultat på hela kursen går till. 
      Det beskriver även var och när studenterna kan ta del av registrerade resultat.</p>
      <p><b>Informationen hjälper studenten</b> att veta var och när den kan få tillgång till resultatet på examination och resultat på hela kursen. 
      Med den informationen kan studenten ta höjd för eventuella omtentor i sin planering. 
      För studenten är det också viktigt att känna trygghet i att den kommer vara berättigad till fortsatt studiemedel.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om resultatrapportering i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Resultatrapportering" beskriver du det som studenten behöver veta om registrering av resultat på examination och resultat på hela kursen. 
      Beskriv var och när studenten kan förväntas hitta resultat på examinationsmoment och resultat på hela kursen. Informationen är särskilt viktig för studenten om resultatrapportering på denna kursomgång skiljer sig från ordinarie rutiner, t.ex. om kursomgången går över flera terminer eller om resultat på hela kursen kan dröja längre än normalt. 
      Studenten ska normalt sett kunna förvänta sig att få resultat senast tre veckor eller femton arbetsdagar efter provtillfället.</p>
      <p>Om det inte finns anledning att informera om resultatrapportering för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>`,
    },
    scheduleDetails: {
      body: `<p><b>Detaljplanering</b> är en översikt av kursomgångens planerade läraktiviteter och examinationstillfällen. 
      Detaljplanering är företrädesvis listad i kronologisk ordning. 
      "Detaljplanering" innehåller information om aktiviteterna och vad studenten behöver förbereda inför varje aktivitet.</p>
      <p><b>Information hjälper studenten</b> att planera sina studier och genomföra kursomgången på ett effektivt sätt. 
      Med en tydlig detaljplanering kan studenten se när i ordningen varje läraktivitet eller examinationstillfälle infaller och med det göra rätt förberedelser vid rätt tidpunkt under kursens genomförande.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Detaljplanering" i inmatningsfältet och klicka i "Inkludera" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Detaljplanering" beskriver du vilka läraktiviteter eller examinationstillfällen som har planerats under kursen. 
      Använd med fördel en tabell för att på ett överblickbart sätt beskriva aktiviteternas ordning, dess innehåll och vilka förberedelser som rekommenderas inför varje aktivitet. 
      Systemet skapar en tabell med tre kolumner åt dig där du kan skriva i kursomgångens läraktiviteter. 
      Du kan anpassa denna tabell genom att t.ex. lägga till rader, lägga till kolumner, eller ersätta den med en tabell från Word.</p>
      <p>Ett enkelt och tydligt sätt är att beskriva detaljplanering genom att för varje läraktivitet eller examination ange typ av aktivitet, aktivitetens innehåll och vilka förberedelser som studenten behöver göra. 
      Förberedelser kan vara kapitel och andra referenser till kurslitteratur eller webbsidor, men det kan också vara att installera programvara eller annan praktisk förberedelse. 
      Länka gärna till instruktioner och material för kursomgången i Canvas, men var uppmärksam på att länkar från tidigare kurs-PM som kopierats till detta kurs-PM kan vara ogiltiga. 
      Testa därför länkar till andra webbsidor innan publicering.</p>
      <br/>
      <p>Följande Detaljplanering är ett exempel från kurs HI1027:
      [Infoga exempel på tabell]</p>
      <br/>
      <p>Om du beskrivit kursens olika läraktiviteter under rubriken "Läraktiviteter" rekommenderas att använda samma terminologi för att studenterna ska se den röda träden genom detta kurs-PM.</p>
      <p>Om det är någon aktivitet som är särskilt viktigt för studenten att förbereda kan det understrykas genom att beskriva det i rubriken "Särskilda förberedelser".</p>`,
    },
    software: {
      body: `<p><b>Programvara</b> beskriver vilken programvara och version av programvaran som ska användas under kursomgången. 
      Om nödvändigt ska Programvara även innefatta instruktioner alternativt referenser och webblänkar till instruktioner om var programvara hittas och hur den installeras.</p>
      <p><b>Informationen hjälper studenten</b> att få tillgång till rätt programvara för att kunna genomföra kursomgången på ett effektivt sätt.</p>
      <p><b>Redigera innehåll</b> genom att klicka på knappen "Redigera”. 
      Ange information om "Programvara" i inmatningsfältet och klicka i "Inkludera rubrik" för att innehållet ska visas när detta kurs-PM publicerats. 
      Du kan välja ”Visa vägledning” för att få vägledning om innehållet och exempel om hur det kan presenteras.</p>`,
      help: `<p>Under rubriken "Programvara" skriver du vilken programvara med version av programvara som eventuellt används under kursomgången. 
      Ange även referenser eller webblänkar till var programvaran finns att hämta, instruktioner och installationsanvisningar om sådana finns på annan plats. 
      Ange annars instruktioner och installationsanvisningar under denna rubrik.</p>
      <p>Om programvara inte är relevant för denna kursomgång låter du rubriken vara dold i detta kurs-PM.</p>
      <p>Nedan visas ett exempel på innehåll under rubriken Programvara i kurs-PM för HI1027.</p>
      <p>Programvaran som används under kursen är freeware och kan laddas ner från nedanstående webbsidor. Information om hur du installerar programvaran finns på kurswebben/Resurser.</p>
      <p>• Javakompilatorn, Java SE DeveloPMent Kit (JDK), och utvecklingsmiljön, NetBeans, laddas ned från https://netbeans.org/downloads/index.html 
      Välj ”NetBeans IDE 8.2”och "Java SE" så installeras både kompilator och utvecklingsmiljö För att även kunna kompilera javakod från ett terminalfönster, utan utvecklingsmiljön NetBeans, ska du efter installationen ange sökvägen till din JDK (som bl.a. innehåller HI1027 3 Anders Lindström, KTH CBH 
      kompilatorn). 
      I Windows lägger du till denna sökväg till miljövariabeln PATH (exempel ”;C:/Program Files/Java/jdk1.8.x/bin”).</p>
      <p>• Dokumentation om Javas standardklasser (API) finns på http://docs.oracle.com/javase/8/docs/api/</p>
      <p>• Under den senare delen av kursen, och i laboration 4, behöver du ett verktyg för objektorienterad modellering med UML. Dia är ett enkelt ritverktyg för detta, http://dia-installer.de</p>`,
    },
    teacher: {
      body: `<p><b>Lärare</b> beskriver kontaktinformation till personer som har rollen lärare på denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vem och hur den ska kontakta angående frågor eller synpunkter till lärare på kursomgången.</p>
	  <p><b>Innehållet redigeras</b> i utbildningsdatabasen <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. Lärare ändras av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik.</p>`,
    },
    teacherAssistants: {
      body: `<p><b>Lärarassistenter</b> beskriver kontaktinformation till personer som har rollen lärarassistent på denna kursomgång.</p>
      <p><b>Informationen hjälper studenten</b> att förstå vem och hur den ska kontakta angående frågor eller synpunkter till lärarassistenter på kursomgången.</p>
	  <p><b>Innehållet redigeras</b> i utbildningsdatabasen <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. Lärarassistenter ändras av <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">personal med behörighet till Kopps</a>. Båda länkarna öppnas i ny flik.</p>`,
    },
  },
  pagesCreateNewPm: [
    {
      title: 'Välj kursomgång',
      intro: `Börja med att välja kursomgång för det kurs-PM som ska publiceras (steg 1 av 3). I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. 
      I sista steget (3 av 3) ges möjlighet att först granska kurs-PM och sedan publicera det som en undersida till “Förbereda och gå kurs”.`,
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
      intro: `Börja med att välja det kurs-PM som ska ändras (steg 1 av 3). 
      I nästa steg (2 av 3) kommer du att kunna redigera kurs-PM. I sista steget (3 av 3) ges möjlighet att först granska kurs-PM 
      och sedan publicera en ny version av kurs-PM på sidan “Förbereda och gå kurs” (kurs-PM)`,
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
    prep: 'Förbereda inför kursstart',
    reqToFinal: 'Examination och slutförande',
    extra: 'Ytterligare information',
    contacts: 'Kontakter',
  },
  pageTitles: {
    new: 'Skapa och publicera kurs-PM',
    published: 'Ändra publicerat kurs-PM',
    preview: 'Skapa och publicera kurs-PM',
  },
  actionModals: {
    changeLadokRoundIds: {
      header: 'Lägg till kurstillfällen',
      body: '',
      btnClose: 'Avbryt',
      btnConfirm: 'Spara',
    },
    infoCancel: {
      header: 'Att tänka på innan du avbryter!',
      body: `Detta utkast kommer att raderas. Den senaste publicerade versionen av detta kurs-PM kommer att förbli oförändrat.
        <br/>
        <br/>
        Vill du fortsätta att avbryta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avbryta',
    },
    infoFinish: {
      header: 'Avsluta',
      body: `Utkast sparas först i steg 2: Redigera kurs-PM.
        <br/>
        <br/>
        I detta steg, steg 1, visas sparade utkast under rubriken: Sparade utkast. Här kan du sedan välja att radera utkastet eller att fortsätta redigera.
        <br/>
        <br/>
        Vill du fortsätta att avsluta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avsluta',
    },
    infoSaveAndFinish: {
      header: 'Avsluta med utkast',
      body: `Utkast är sparat.
        <br/>
        <br/>
        I steg 1: Välj kursomgång, visas sparade utkast under rubriken: Sparade utkast. I detta steg kan du sedan välja att radera utkastet eller att fortsätta redigera.
        <br/>
        <br/>
        Vill du fortsätta att avsluta?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt avsluta',
    },
    infoPublish: {
      header: 'Att tänka på innan du publicerar!',
      body: `Publicering kommer att ske på sidan Kurs-PM för vald termin och kursomgång.
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
    newSectionRemove: {
      header: 'Att tänka på innan du ta bort en tillagd rubrik!',
      body: `Rubriken med innehåll kommer att raderas och kan inte återskapas.
      <br/><br/>
      Vill du fortsätta radera den tillagd rubriken?`,
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
      // body:
      //   '<p>Välj vilken termin kursomgången startar. Om kursomgången sträcker sig över flera terminer; välj kursomgångens starttermin.</p>'
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
        label: 'Markera ett eller flera kurstillfällen som du vill lägga till:',
        infoText: 'Kurstillfällena listade saknar ett publicerat kurs-pm eller utkast',
      },
      availableRounds: {
        label: 'Markera ett eller flera kurstillfällen som ingår i kursomgången',
        infoText: 'Kurstillfällena listade saknar ett publicerat kurs-pm eller utkast',
      },
      existedDrafts: {
        label: 'Välj det utkast du vill fortsätta att redigera',
        infoText: 'Utkasten listade är sparade men ej publicerade',
      },
      publishedMemos: {
        label: 'Välj det kurs-PM du vill redigera: ',
        infoText: 'Kurs-PM listade är publicerade',
      },
    },
    createFrom: {
      labelBasedOn: 'Utgå från:',
      labelAllPrevMemos: 'Välj kurs-PM att kopiera:',
      infoTextForMemos: 'Listade Kurs-PM är publicerade för tidigare kursomgångar',
      basedOnStandard: 'Tom KTH-mall för kurs-PM',
      basedOnAnotherMemo: 'Kopia av kurs-PM från en tidigare kursomgång',
    },
    publishedHasDraft: ' (finns opublicerade ändringar)',
    errKoppsRounds: 'Kunde inte få kursomgångar på grund av fel i Kopps. Försöka refresha sidan.',
    noRoundsToAdd:
      'Det finns inga kurstillfällen för denna termin som inte redan har ett publicerat kurs-pm eller ett utkast till ett kurs-pm.',
    noCourseRoundsAvailable:
      'Samtliga kurstillfällen för denna termin ingår redan i en kursomgång som har ett publicerat kurs-PM eller utkast. Se sparade utkast på denna sida eller publicerade kurs-PM på sidan Om kurs-PM för din kurs.',
    noSavedDrafts: 'Det finns inga sparade utkast.',
    noSemesterAvailable:
      'Det finns inga terminer att välja eftersom det saknas aktuella eller kommande kursomgångar för denna kurs. Kontrollera i systemet Kopps om du förväntar dig kursomgångar att skriva kurs-PM för.',
    noPrevPublishedAvailable: 'Det finns inga publicerade kurs-PM tidigare kursomgångar.',
    noPublishedMemos: 'Det finns inga publicerade kursomgångar för denna termin, föregående eller kommande.',
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Lägg till rubrik till ',
    btnClose: 'Stäng',
    btnRemove: 'Radera utkast',
    btnRemoveHeading: 'Ta bort tillagd rubrik',
    btnFinish: 'Avsluta',
    btnSaveAndFinish: 'Avsluta med utkast',
    closeEditor: 'Stäng redigeringsläge',
    preview: 'Granska',
    previewPdf: 'Granska PDF',
    edit: 'Redigera',
    cancel: 'Avbryt',
    save: 'Spara',
    saveDraft: 'Spara utkast',
    publish: 'Publicera',
    goToRounds: 'Välj kursomgång',
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
    commentChanges: 'Ange alla ändringar i denna version:',
    contentHeaders: {
      title: 'Rubriker',
      intro: `<p>Alla fasta och valbara rubriker i detta kurs-PM visas nedan. Rubrikerna är grupperade i fem sektioner; "Innehåll och lärandemål", "Förbereda inför kursstart", "Examination och slutförande", "Ytterligare information" and "Kontakter".</p>
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
      'Du måste välja ett kurs-PM att kopiera (se röd markering nedan) för att kunna gå vidare till "Skapa och publicera kurs-PM"',
    errNoInPublishedChosen: 'Du måste välja ett kurs-PM för att kunna gå vidare till Redigera',
    errWhileDeleting:
      'Det gick inte att ta bort utkasten på grund av systemfel. Försök igen eller kontakta IT-support.',
    errWhileSaving: 'Det gick inte att spara utkast på grund av systemfel. Försök igen eller kontakta IT-support.',
    infoAboutFreshData: 'Kursplans-information och kontaktinformation har uppdaterats automatiskt.',
    // Viss information som hämtas har ändrats i källsystemen sedan förra versionen av kurs-pm publicerades. Den uppdaterad informationen visas nedan.
    infoRebuildDraft: 'Kurs-PM nedan har återställts till den senaste publicerade versionen.',
    infoStartAgain: 'Det finns ändringar som ej publicerats. Du kan',
    linkToRefreshData: 'återgå till senaste publicerade versionen av kurs-PM ',
    removedAddedHeading: 'Tillagd rubrik har tagits bort',
    removedEmptyHeading: 'Tillagd rubrik har tagits bort eftersom det saknas rubrik och innehåll',
    syllabusUpdated:
      'Information från kursplan och kontaktinformation har uppdaterats med den senaste giltiga informationen i utkastet nedan.',
    warnFillInCommentAboutChanges:
      'Du behöver fylla i obligatoriska fält (markerade i rött nedan) för att gå vidare till “Granska och publicera”',
    warnReplacePm:
      'Observera: publicering av nytt uppladdat kurs-PM kommer att ersätta befintligt kurs-PM (se "Välj kursomgång" nedan)',
  },
  breadCrumbLabels: {
    university: 'KTH',
    student: 'Student på KTH',
    directory: 'Kurs- och programkatalogen',
    aboutCourse: 'Om kursen',
    noLinksInPreview: 'Länkar i menyn fungerar inte i granska-läge',
  },
  coursePresentationLabels: {
    imageAltText: 'Inspirerande bild för kursen',
    imageTitleText: '',
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
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Undervisningsspråk',
    offeredByTitle: 'Kursen ges av',
    roundsTitle: 'Kursomgång',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
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
    linkHeaderTitle: 'Student på KTH',
    beforeAndDuringACourse: 'Inför och under en kurs',
    contactPersonsAndStudentCounselling: 'Studievägledare och kanslier',
    rightsAndResponsibilities: 'Rättigheter och skyldigheter',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
  },
  courseContactsLabels: {
    courseContactsTitle: 'Kontakter',
    communicationWithTeachersTitle: 'Kommunikation i kursen',
    courseCoordinatorTitle: 'Kursansvarig',
    teacherTitle: 'Lärare',
    teacherAssistantsTitle: 'Lärarassistenter',
    examinerTitle: 'Examinator',
    otherContactsTitle: 'Övriga kontakter',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
    mandatoryFieldMissing: 'Obligatoriskt innehåll saknas',
  },
  courseHeaderLabels: {
    adminLinkLabel: 'Administrera Om kursen',
    linkOpensInNewTab: 'Länken kommer att öppnas i ny flik',
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
