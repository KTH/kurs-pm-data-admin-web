module.exports = {
  shortNames: ['en'],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%d-%b-%Y',

    /**
     * Error messages
     */

    error_not_found: "Sorry, we can't find your requested page",
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'kurs-pm-data-admin-web',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'This page in English',
    main_site_name: 'Administrate About the course ',
    site_name: 'Administration of Course Memos',
    host_name: 'KTH',

    memoLabel: 'Course memo',

    /**
     * Labels
     */
    section_info_visibility_label_shown: 'Shown in course memo',
    section_info_visibility_label_hidden: 'Hidden in course memo',
    section_info_visibility_mandatory: 'Mandatory information (can’t be hidden in course memo)',

    /**
     * Headings
     */
    page_header_heading_semester: 'Semester',
    page_header_heading_course_round: 'Course round'
  },
  sourceInfo: {
    addNewTitle: 'Name new section',
    fetched: 'Fetched', // IF NOT EDITABLE
    '(c)': 'from common course information',
    '(r)': 'from course round information',
    '(s)': 'from course syllabus (s)',
    errorEmptyTitle: 'You need to name the content',
    mandatory: 'Mandatory information',
    mandatoryAndEditable: 'Mandatory information',
    mandatoryForSome: 'Mandatory information for some courses?',
    includeInMemo: {
      section: 'Include header...*?',
      subSection: 'Include paragraph...*?'
    }, // RUBRIK/ADDITION
    noInfoYet: {
      section: 'No information is added. Press "Edit" to add information....',
      subSection: 'No information is added. Press "Edit" to add information....'
    },
    notIncludedInMemoYet: {
      section:
        'Content is here. Choose "Include in memo" to show added content and header in memo...',
      subSection:
        'Content is here. Choose "Include in memo" to show added content and header in memo...'
    },
    nothingFetched: {
      mandatoryAndEditable: 'No information was available to fetch, click Edit to add own text',
      mandatory: 'No information was available to fetch, edit in kopps....',
      mandatoryForSome:
        'No information was available to fetch because it is not intended for this course....',
      optional:
        'No information was available to fetch. How to change it you can find in information icon above. Header is optional therefore you can choose to include or not....'
    }
  },
  memoTitlesByMemoLang: {
    additionalRegulations: 'Additional regulations',
    commentAboutMadeChanges: 'Made changes',
    communicationDuringCourse: 'Communication during course',
    courseContent: 'Course contents',
    courseCoordinator: 'Course coordinator',
    ethicalApproach: 'Ethical approach',
    equipment: 'Equipment',
    examiner: 'Examiner',
    examination: 'Examination',
    extraHeaders1: 'Extra header 1',
    extraHeaders2: 'Extra header 2',
    extraHeaders3: 'Extra header 3',
    extraHeaders4: 'Extra header 4',
    extraHeaders5: 'Extra header 5',
    gradingCriteria: 'Grading criteria',
    gradingScale: 'Grading scale',
    infoForReregisteredStudents: 'Changes of the course before this course offering',
    learningActivities: 'Learning activities',
    learningOutcomes: 'Intended learning outcomes',
    literature: 'Literature',
    otherContacts: 'Other contacts',
    otherRequirementsForFinalGrade: 'Other requirements for final grade',
    permanentDisability: 'Support for students with disabilities',
    possibilityToAddition: 'Opportunity to raise an approved grade via renewed examination',
    possibilityToCompletion:
      'Opportunity to complete the requirements via supplementary examination',
    possibilityToCompensate: 'Alternatives to missed activities or tasks',
    preparations: 'Specific preparations',
    prerequisites: 'Recommended prerequisites',
    reportingResults: 'Reporting of exam results',
    scheduleDetails: 'Detailed plan',
    software: 'Software',
    teacher: 'Teacher',
    teacherAssistants: 'Teacher assistants'
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: `<p><b>Additional regulations</b> describes regulations in the course syllabus that does not comply with any of the other sections in the course syllabus. 
      Some examples are if the course is cannot be included in their degree certificate, 
      if the student is required to perform studies on a different campus than the ordinary, or if the course require expenses other than for literature, stationery and similar.</p>
      <p><b>The information helps the student</b>, depending on the contents of "Additional regulations", to plan and prepare for their studies.</p>
      <p><b>Contents can be edited</b> in Kopps. 
      Changes of "Additional regulations" is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>
      <p>If there is no content the heading will not be visible in the published course memo.</p>`
    },
    commentAboutMadeChanges: {
      body: 'It is important for students because they can plan their studies....'
    },
    communicationDuringCourse: {
      body: 'It is important for students because they can plan their studies....'
    },
    courseContent: {
      body: `<p><b>Course contents</b> describes the subjects and the general abilities that is discussed or practised on the course.</p>
      <p><b>The information helps the student</b> to understand what concepts, subjects, abilities etc. to read up on before and during the courses. 
      In that way, course contents helps the student to prepare both before and during the course.</p>
      <p><b>Contents can be edited</b> in Kopps. Changes of course contents is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page 
      <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>`
    },
    courseCoordinator: {
      body: 'It is important for students because they can plan their studies....'
    },
    ethicalApproachSubSection: {
      body: 'It is important for students because they can plan their studies....'
    },
    ethicalApproach: {
      body: 'It is important for students because they can plan their studies....'
    },
    equipment: {
      body: 'It is important for students because they can plan their studies....'
    },
    examiner: {
      body: 'It is important for students because they can plan their studies....'
    },
    examination: {
      body: 'It is important for students because they can plan their studies....'
    },
    examinationSubSection: {
      body: 'It is important for students because they can plan their studies....'
    },
    extraHeaders1: {
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders2: {
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders3: {
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders4: {
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders5: {
      body: 'Here you can add owh headers to H3'
    },
    gradingCriteria: {
      body: 'It is important for students because they can plan their studies....'
    },
    gradingScale: {
      body: 'It is important for students because they can plan their studies....'
    },
    infoForReregisteredStudents: {
      body: `<p><b>Changes of the course before this course offering</b> describes the relevant conclusions from previous course evaluations and course analysis and what changes that have actually been implemented before this course offering.</p>
      <p><b>The information helps the student</b> to understand what changes of the course that has been made to this course offering.
      This is especially important for re-registered students who needs to be informed about any important differences to the previous course offering. 
      Describing the changes is a good way to show the students that the course development is important and that it actually helps to improve the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Changes of the course before this course offering" and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel for further guidance on what and how to write the contents.</p>`,
      help: `<p>Describe the changes that have been made to the course before this course offering in the section "Changes of the course before this course offering". 
      Some relevant conclusions from previous course evaluations and course analysis could also be important to point out to help the student to plan and prepare for the course. 
      The course memo as a document is one of several mediums to inform the students about the results from course evaluations and course analysis and the decisions that followed.</p>
      <p>Uncheck "Include heading" if information about "Changes of the course before this course offering" is irrelevant for this course.</p>`
    },
    learningActivities: {
      body: `<p><b>Learning activities</b> describes the types of planned activities on the course and what is important to know about each learning activity. 
      For example, learning activities defines what a seminar or a laboration is on this particular course.</p>
      <p><b>The information helps the student</b> to understand the activities and to do the necessary preparations prior to the activity. 
      Each activity type may have different meanings on different courses. Well described learning activities sets the right expectations on each type of activity.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about learning activities and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel for further guidance on what and how to write the contents.</p>`,
      help: `<p>Describe the planned types of learning activities on the course in the section "Learning activities". 
      Use an established term for each type and repeat the term throughout the course memo. 
      Describe what the learning activity means for this particular course and what is important for the student to know about it. 
      You can add information about how many of each activity type and how they are distributed over the course. </p>
      <p>If the pedagogical disposition of the course is relevant for planning and preparations it can also be described in this section.</p>
      <p>Uncheck "Include heading" if information about learning activities is irrelevant for this course.</p>`
    },
    learningOutcomes: {
      body: `<p><b>Intended learning outcomes</b> clarifies what knowledge, what skills, which evaluation abilities and approaches the student needs to demonstrate after taking the course.</p>
      <p><b>The information helps the student</b> to understand what targets the student needs to achieve for a passed grade. Intended learning outcomes helps the student to plan the course. 
      The following information in this course memo, in many ways, relates to the intended learning outcome. Therefore, it is important that the information is unambiguously formulated.</p>
      <p><b>Contents can be edited</b> in Kopps. 
      Changes of intended learning outcome is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>`
    },
    literature: {
      body: 'It is important for students because they can plan their studies....',
      help: 'Itttssss impoortant!'
    },
    otherContacts: {
      body:
        'It is important to know Lab supervisors for students because they can plan their studies....'
    },
    otherRequirementsForFinalGrade: {
      body: 'It is important for students because they can plan their studies....'
    },
    permanentDisability: {
      body: 'It is important for students because they can plan their studies....'
    },
    permanentDisabilitySubSection: {
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToAddition: {
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToCompletion: {
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToCompensate: {
      body: 'It is important because'
    },
    preparations: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p></p>
      <p></p>`
    },
    prerequisites: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p></p>
      <p></p>`
    },
    reportingResults: {
      body: '...',
      help: `<p></p>
      <p></p>`
    },
    scheduleDetails: {
      body: `<p><b>Detailed plan</b> is an overview of the learning activities and examinations on the course, preferably in a chronological order. 
      The detailed plan contains information about each activity and what preparations that are recommended prior to each activity.</p>
      <p><b>The information helps the student</b> to plan for the studies and take the course effeciently. 
      A clear plan illustrates the order of the activities on the course and that makes it easy for the student to do proper preparations with the right timing.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about the detailed plan and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel for further guidance on what and how to write the contents.</p>`,
      help: `<p>Describe the planned learning activities and examination in the "Detailed plan" section. It is common to use a table to represent the plan. 
      A table illustrates the order of the activities, its content, and what preparations that is recommended prior to each activity. 
      If you have chosen to create and publish a new course memo this form will automatically provide you with a table with three columns. 
      You can complete the table with information about the activities. You can add or remove columns by your own choice or simply replace the table with another table from Word by copy/paste.</p>
      <p>A simple but distinct format is to describe the detailed plan with three parts; the type of activity, a description of its content and a description of what preparations that is recommended. 
      Preparations is often described as references to literature or web pages, but it could also be practical instructions like installation of software. 
      Insert links to more detailed instructions and material for this course offering in Canvas. Make sure the links leads to the right page. 
      A course memo that is copied from a previously published course memo may contain links to web pages and materials that is not relevant for this course offering. 
      It is therefore recommended to test the links before publishing.</p>
      <br/>
      <p>The following detailed plan is an example from course EQ2400:
      [infoga exempel på tabell]</p>
      <br/>
      <p>It is recommended to use the same terminology as defined in the "Learning activities" section. 
      A coherent course memo makes it easier for students to recognize the concepts and to understand the course memo as a whole.</p>
      <p>If there are preparations that are particularly important, you can highlight them in the "Specific preparations" section in this course memo.</p>`
    },
    software: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p></p>
      <p></p>`
    },
    teacher: {
      body: 'It is important for students because they can plan their studies....'
    },
    teacherAssistants: {
      body: 'It is important for students because they can plan their studies....'
    }
  },
  pagesCreateNewPm: [
    {
      title: 'Choose course offering',
      intro: `Choose a semester and a course offering for thecourse memo to be published (step 1 of 3). 
      In this step you can choose to create a new coursememo for the course offering or you can chooseto copy a draft from a previously published course memo for this course. 
      In the next step (2 of 3) you can edit the course memo. 
      Preview the course memo in the last step (3 of 3) and then publish it on the course site “About the course” for the chosen semester and course offering.
      `
    },
    {
      title: 'Edit course memo',
      intro: ''
    },
    {
      title: 'Review and publish',
      intro: `In this step (3 of 3) a preview of the course memo data with course data is presented as it will be published on the page .... 
      It is possible to go back to make adjustments, to save a draft or publish the information.`
    }
  ],
  pagesChangePublishedPm: [
    {
      title: 'Choose a course memo',
      intro: `Start by choosing the course memo you want to change (step 1 of 3). Edit the chosen course memo in the next step (2 of 3). 
      Review the new version of the course memo in the last step (3 of 3) and then publish it on the page About the course / Prepare and take course.`
    },
    {
      title: 'Edit course memo',
      intro: ''
    },
    {
      title: 'Review and publish',
      intro: `In this step (3 of 3) a preview of the course memo data with course data is presented as it will be published on the page .... 
      It is possible to go back to make adjustments, to save a draft or publish the information.`
    }
  ],
  progressBarHeaders: [
    {
      title: 'Choose course offering',
      intro: `Choose a semester and a course offering for thecourse memo to be published (step 1 of 3). 
      In this step you can choose to create a new coursememo for the course offering or you can chooseto copy a draft from a previously published course memo for this course. 
      In the next step (2 of 3) you can edit the course memo. 
      Preview the course memo in the last step (3 of 3) and then publish it on the course site “About the course” for the chosen semester and course offering.
      `
    },
    {
      title: 'Edit course memo',
      intro: `In this step (2 of 3) course memo data and course memo shall be uploaded, 
      changes to the chosen course offering is summarized and some of the course data are reviewed and adjusted.`
    },
    {
      title: 'Review and publish',
      intro: ''
    }
  ],
  progressTitleHeaders: [
    {
      title: '1. Choose course offering',
      intro: `Choose a semester and a course offering for thecourse memo to be published (step 1 of 3). 
      In this step you can choose to create a new coursememo for the course offering or you can chooseto copy a draft from a previously published course memo for this course. 
      In the next step (2 of 3) you can edit the course memo. 
      Preview the course memo in the last step (3 of 3) and then publish it on the course site “About the course” for the chosen semester and course offering.
      `
    },
    {
      title: '2. Edit course memo',
      intro: `In this step (2 of 3) course memo data and course memo shall be uploaded, 
      changes to the chosen course offering is summarized and some of the course data are reviewed and adjusted.`
    },
    {
      title: 'Review and publish course memo',
      intro:
        'In this step (3 of 3) you can review the course memo as it will look on the published web page. It is also possible to review the course memo as a PDF. You can return to the previous page if you want to continue editing the course memo, or you can end your work with this draft and return to it another time. If you publish this course memo it will be visible as a sub page to About the course / Prepare and take course.'
    }
  ],
  sectionsLabels: {
    contentAndOutcomes: 'Content and learning outcomes',
    prep: 'Preparations before course start',
    reqToFinal: 'Examination and completion',
    extra: 'Further information',
    contacts: 'Contact'
  },
  pageTitles: {
    new: 'Create and publish course memo',
    // draft: 'Publish course memo draft',
    published: 'Edit published course memo',
    preview: 'Create and publish course memo'
  },
  actionModals: {
    infoCancel: {
      header: 'To be aware of before cancelling!',
      body: `A draft is automatically saved immediately after you started editing the course memo in step 2, Edit course memo. If you don ́t want to keep the draft, you can choose Delete draft in step 1, Choose course offering, the next time you use the service Create and publish course memo.
        <br/>
        <br/>
        Do you want to cancel?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, cancel'
    },
    infoFinish: {
      header: 'EN -> Avsluta',
      body: `EN -> Utkast sparas först i steg 2: Redigera kurs-PM.
        <br/>
        <br/>
        I detta steg, steg 1, visas sparade utkast under rubriken: Sparade utkast. Här kan du sedan välja att radera utkastet eller att fortsätta redigera.
        <br/>
        <br/>
        EN -> Vill du fortsätta att avbryta?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, finish'
    },
    infoSaveAndFinish: {
      header: 'EN -> Avsluta med utkast',
      body: `EN -> Utkast är sparat.
        <br/>
        <br/>
        I steg 1 (Välj kursomgång) visas sparade utkast under rubriken: Fortsätt med ett sparat utkast. 
        Utkast kan tas bort genom att välja ett utkast och sedan: Radera utkast.
        <br/>
        <br/>
        EN -> Vill du fortsätta att avbryta?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, finish'
    },
    infoPublish: {
      header: 'To be aware of before publishing!',
      body: `The information will be published on the page Course development and history
        <br/> 
        <br/> 
        Do you want to publish?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, publish'
    },
    infoRemove: {
      header: 'To be aware of before deleting this draft!',
      body: `Deleting the draft cannot be undone. The draft will be lost.
      <br/>
      <br/>
      Do you want do delete this draft?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, delete'
    },
    newSectionRemove: {
      header: 'To be aware of before deleting this header!',
      body: `Deleting the header cannot be undone. The new section will be lost.
      <br/>
      <br/>
      Do you want do delete this header and its content?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, delete'
    }
  },
  info: {
    chooseSavedDraft: 'EN -> Sparade utkast',
    createNew: 'Choose course offering',
    choosePublishedMemo: 'Choose course memo',
    chooseSemester: {
      label: 'Choose semester'
      // body:
      //   '<p>Choose what semester the course offering starts in. If the course offering stretches over several semesters then choose the first semester.</p>'
    },
    chooseRound: {
      header: 'Choose course offering',
      body: `<p>Choose all the administrative course instances that is included in the course offering. 
      Students are admitted to an administrative course instance. 
      Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. 
      A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. 
      Several administrative course instances are grouped to one course offering.</p>`,
      availableRounds: {
        label: 'Select the instances that is included in the course offerings',
        infoText:
          'The following administrative course instances have no published course memo or draft'
      },
      existedDrafts: {
        label: 'Select a draft and click on the button Edit to continue edit the draft',
        infoText: 'The following course offerings have drafts that are not yet published'
      },
      publishedMemos: {
        label: 'Select a course memo you want to edit: ',
        infoText: 'Course memos which are published'
      }
    },
    publishedHasDraft: ' (has unpublished alterations)',
    errKoppsRounds:
      'Could not fetch all available rounds because of error in Kopps. Try to refresh page',
    noCourseRoundsAvailable:
      'All administrative course instances the chosen semester are already included in a course offering that has a published course memo or draft.',
    noSavedDrafts: 'There are no saved drafts.',
    noSemesterAvailable:
      'There are no semesters to choose since there are no current or future course offerings for this course. Check Kopps if you expect course offerings to create course memos for.',
    noPublishedMemos:
      'Det finns inga publicerade kursomgångar för denna termin, föregående eller kommande.'
  },
  changePublishedInfo: {
    choosePublishedMemo: 'Choose course memo'
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Add a new header to ',
    btnClose: 'Close',
    btnRemove: 'Delete draft',
    btnRemoveHeader: 'Remove added header',
    btnFinish: 'Finish',
    btnSaveAndFinish: 'Finish (save draft)',
    closeEditor: 'Close edit mode',
    preview: 'Preview',
    edit: 'Edit',
    cancel: 'Cancel',
    save: 'Save',
    saveDraft: 'Save draft',
    publish: 'Publish',
    goToRounds: 'Choose course offering',
    save_and_cancel: 'Save draft and cancel',
    btn_copy: 'Copy link to preview',
    btn_switch_view_single: 'Switch to “Single View”',
    btn_switch_view_scroll: 'Switch to “Scroll View”'
  },
  extraInfo: {
    season: {
      1: 'Spring ',
      2: 'Autumn '
    },
    labelStartDate: 'Start date',
    // hasSavedDraft: 'Has a published course memo',
    contentHeaders: {
      title: 'Headers',
      intro: 'Headers....'
    },
    commentChanges: 'Describe changes made in this version:',
    mandatory: 'Mandatory'
  },
  alerts: {
    autoSaved: 'Draft saved',
    autoSavedTemporary: 'Changes save temporarily before publishing.',
    errKoppsRounds:
      'Could not fetch all available rounds because of error in Kopps. Try to refresh page',
    errNoChosen:
      'You must choose a draft or at least one administrative course instance to go further to the next step Edit course memo.',
    errNoInPublishedChosen: 'You must choose a course memo to go to Edit',
    errWhileSaving: 'Smth went wrong on api side......',
    errWhileDeleting: 'Cannot delete draft, smth wrong... try later',
    infoAboutFreshData: 'should be in EN --> Information som hämtas har automatiskt uppdateras..',
    infoRebuildDraft:
      'should be in EN --> Kurs-PM nedan har återställts till den senaste publicerade versionen.',
    infoStartAgain: 'should be in EN --> Det finns ändringar som ej publicerats. Du kan',
    linkToRefreshData: 'should be in EN -->  återgå till senaste publicerade versionen av kurs-PM',
    warnFillInCommentAboutChanges:
      'should be in EN --> Du behöver fylla i obligatoriska fält (markerade i rött nedan) för att gå vidare till “Granska och publicera”',
    warnNameNewSection: 'You need to give a name to a new section',
    warnReplacePm:
      'Observ: Any previously published course memo (see course offering below) will be replaced by the new course memo to be edited.'
  },
  breadCrumbLabels: {
    university: 'KTH',
    student: 'Student at KTH',
    directory: 'Course and programme directory',
    aboutCourse: 'About course',
    noLinksInPreview: 'Menu links doesn’t work in review mode'
  },
  coursePresentationLabels: {
    imageAltText: 'Inspiring image for course',
    imageTitleText: ''
  },
  sideMenuLabels: {
    directory: 'Course and programme directory',
    aboutCourse: 'About course',
    beforeChoosingCourse: 'Before choosing course',
    courseMemo: 'Prepare and take course',
    finishCourse: 'Finish course',
    courseDevelopmentAndHistory: 'Course development and history',
    noLinksInPreview: 'Menu links doesn’t work in review mode'
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Language Of Instruction',
    offeredByTitle: 'Offered By',
    roundsTitle: 'Rounds',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab'
  },
  courseMemoLinksLabels: {
    versionTitle: 'Course memo version',
    latest: 'Latest:',
    courseMemoArchiveLabel: 'Course memo archive',
    courseMemoPdf: 'Course memo pdf',
    syllabus: 'Syllabus',
    syllabusInformation: '(s) fetched from',
    syllabusLinkStart: 'Syllabus (',
    syllabusLinkEnd: '– )',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab'
  },
  courseLinksLabels: {
    linkHeaderTitle: 'Student at KTH',
    beforeAndDuringACourse: 'Before and during a course',
    contactPersonsAndStudentCounselling: 'Contact persons and student counselling',
    rightsAndResponsibilities: 'Rights and responsibilities',
    linkOpensInNewTab: 'Link will open in new tab'
  },
  courseContactsLabels: {
    courseContactsTitle: 'Contacts',
    communicationWithTeachersTitle: 'Communication With Teachers',
    courseCoordinatorTitle: 'Course Coordinator',
    teacherTitle: 'Teacher',
    teacherAssistantsTitle: 'Teacher Assistants',
    examinerTitle: 'Examiner',
    otherContactsTitle: 'Other Contacts',
    linkOpensInNewTab: 'Link will open in new tab'
  },
  courseHeaderLabels: {
    adminLinkLabel: 'Administrate About course information',
    linkOpensInNewTab: 'Link will open in new tab'
  },
  courseImage: {
    Architecture: 'Picture_by_MainFieldOfStudy_01_Architecture.jpg',
    Biotechnology: 'Picture_by_MainFieldOfStudy_02_Biotechnology.jpg',
    'Computer Science and Engineering': 'Picture_by_MainFieldOfStudy_03_Computer_Science.jpg',
    'Electrical Engineering': 'Picture_by_MainFieldOfStudy_04_Electrical_Engineering.jpg',
    Physics: 'Picture_by_MainFieldOfStudy_05_Physics.jpg',
    'Industrial Management': 'Picture_by_MainFieldOfStudy_06_Industrial_Management.jpg',
    'Information Technology': 'Picture_by_MainFieldOfStudy_07_Information_Technology.jpg',
    'Information and Communication Technology':
      'Picture_by_MainFieldOfStudy_08_Information_Communication.jpg',
    'Chemical Science and Engineering': 'Picture_by_MainFieldOfStudy_09_Chemical_Science.jpg',
    'Chemistry and Chemical Engineering': 'Picture_by_MainFieldOfStudy_10_Chemistry_Chemical.jpg',
    Mathematics: 'Picture_by_MainFieldOfStudy_11_Mathematics.jpg',
    'Environmental Engineering': 'Picture_by_MainFieldOfStudy_12_Environmental_Engineering.jpg',
    'Molecular Life Science': 'Picture_by_MainFieldOfStudy_13_Molecular_Life_Science.jpg',
    'Mechanical Engineering': 'Picture_by_MainFieldOfStudy_14_Mechanical_Engineering.jpg',
    'Materials Science': 'Picture_by_MainFieldOfStudy_15_Materials_Science.jpg',
    'Medical Engineering': 'Picture_by_MainFieldOfStudy_16_Medical_Engineering.jpg',
    'Materials Science and Engineering': 'Picture_by_MainFieldOfStudy_17_Materials_Engineering.jpg',
    'Built Environment': 'Picture_by_MainFieldOfStudy_18_Built_Environment.jpg',
    'Engineering Physics': 'Picture_by_MainFieldOfStudy_19_Engineering_Physics.jpg',
    'Technology and Economics': 'Picture_by_MainFieldOfStudy_20_Technology_Economics.jpg',
    'Technology and Health': 'Picture_by_MainFieldOfStudy_21_Technology_Health.jpg',
    'Technology and Management': 'Picture_by_MainFieldOfStudy_22_Technology_Management.jpg',
    Technology: 'Picture_by_MainFieldOfStudy_23_Technology.jpg',
    'Engineering and Management': 'Picture_by_MainFieldOfStudy_24_Engineering_Management.jpg',
    'Technology and Learning': 'Picture_by_MainFieldOfStudy_25_Technology_Learning.jpg',
    default: 'Picture_by_MainFieldOfStudy_26_Default_picture.jpg'
  }
}
