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
    locale_text: 'English',

    site_name: 'Administration of Course Memos',
    host_name: 'KTH',

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
    scheduleDetails: 'Schedule details',
    software: 'Software',
    teacher: 'Teacher',
    teacherAssistants: 'Teacher assistants'
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: 'It is important for students because they can plan their studies....'
    },
    communicationDuringCourse: {
      body: 'It is important for students because they can plan their studies....'
    },
    courseContent: {
      body: 'It is important for students because they can plan their studies....'
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
      body: 'It is important for students because they can plan their studies....'
    },
    // languageOfInstructions: {
    //   header: 'Language of instruction',
    //   body: 'It is important for students because they can plan their studies....'
    // },
    learningActivities: {
      body: 'It is important for students because they can plan their studies....'
    },
    learningOutcomes: {
      body: 'It is important for students because they can plan their studies....'
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
      body: 'It is important for students because they can plan their studies....'
    },
    prerequisites: {
      body: 'It is important for students because they can plan their studies....'
    },
    reportingResults: {
      body: '...'
    },
    scheduleDetails: {
      body: 'It is important for students because they can plan their studies....'
    },
    software: {
      body: 'It is important for students because they can plan their studies....'
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
      title: '1.Choose course offering',
      intro: `Choose a semester and a course offering for thecourse memo to be published (step 1 of 3). 
      In this step you can choose to create a new coursememo for the course offering or you can chooseto copy a draft from a previously published course memo for this course. 
      In the next step (2 of 3) you can edit the course memo. 
      Preview the course memo in the last step (3 of 3) and then publish it on the course site “About the course” for the chosen semester and course offering.
      `
    },
    {
      title: '2.Edit course memo',
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
      title: '3. Review and publish',
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
      intro: `In this step (3 of 3) a preview of the course memo data with course data is presented as it will be published on the page .... 
      It is possible to go back to make adjustments, to save a draft or publish the information.`
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
    chooseSavedDraft: 'Continue to edit a saved draft',
    createNew: 'Create new or copy?',
    chooseSemester: {
      header: 'Choose semester',
      body:
        '<p>Choose what semester the course offering starts in. If the course offering stretches over several semesters then choose the first semester.</p>'
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
    btnClose: 'Close',
    btnRemove: 'Delete draft',
    closeEditor: 'Close edit mode',
    preview: 'Preview',
    edit: 'Edit',
    cancel: 'Cancel',
    save: 'Save draft',
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
    }
  },
  alerts: {
    autoSaved: 'Draft saved',
    errKoppsRounds:
      'Could not fetch all available rounds because of error in Kopps. Try to refresh page',
    errNoChosen:
      'You must choose a draft or at least one administrative course instance to go further to the next step Edit course memo.',
    errNoInPublishedChosen: 'You must choose a course memo to go to Edit',
    errWhileSaving: 'Smth went wrong on api side......',
    warnReplacePm:
      'Observ: Any previously published course memo (see course offering below) will be replaced by the new course memo to be edited.',
    warnNameNewSection: 'You need to give a name to a new section'
  },
  breadCrumbLabels: {
    university: 'KTH',
    student: 'Student at KTH',
    directory: 'Course and programme directory',
    aboutCourse: 'About course'
  },
  sideMenuLabels: {
    directory: 'Course and programme directory',
    aboutCourse: 'About course',
    beforeChoosingCourse: 'Before choosing course',
    courseMemo: 'Prepare, attend (course memo)',
    finishCourse: 'Finish course',
    courseDevelopmentAndHistory: 'Course development and history'
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Language Of Instruction',
    offeredByTitle: 'Offered By',
    mandatoryFieldMissing: 'Missing mandatory information'
  }
}
