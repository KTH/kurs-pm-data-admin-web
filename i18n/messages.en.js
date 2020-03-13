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
    '(c)': '<p><b>(c)</b> Fetched from a general course source</p>',
    '(pm)':
      '<p><b>(pm)</b> Fetched from a course round related source which is used to complete a course</p>',
    '(r)':
      '<p><b>(r)</b> Fetched from a course round related source which is used for course choice</p>',
    '(s)': '<p><b>(s)</b> Fetched from a course syllabus (2017 - tills idag)</p>',
    mandatory: 'Mandatory information (can’t be hidden in course memo)',
    shown: {
      // Remove
      true: 'shown in course memo',
      false: 'hidden in course memo'
    },
    includeInMemo: 'Include in memo',
    noInfoYet: 'No information is added. Press "Edit" to add information....',
    notIncludedInMemoYet:
      'Content is here. Choose "Include in memo" to show added content and header in memo...'
  },
  memoHeadings: {
    additionalRegulations: {
      header: 'Additional regulations',
      body: 'It is important for students because they can plan their studies....'
    },
    communicationDuringCourse: {
      header: 'Communication during course',
      body: 'It is important for students because they can plan their studies....'
    },
    courseContent: {
      header: 'Course contents',
      body: 'It is important for students because they can plan their studies....'
    },
    courseCoordinator: {
      header: 'Course coordinator ',
      body: 'It is important for students because they can plan their studies....'
    },
    ethicalApproachThisCourse: {
      header: 'Course specific regulations for ethical approach',
      body: 'It is important for students because they can plan their studies....'
    },
    ethicalApproach: {
      header: 'Ethical approach',
      body: 'It is important for students because they can plan their studies....'
    },
    equipment: {
      header: 'Equipment',
      body: 'It is important for students because they can plan their studies....'
    },
    examiner: {
      header: 'Examiner',
      body: 'It is important for students because they can plan their studies....'
    },
    examination: {
      header: 'Examination',
      body: 'It is important for students because they can plan their studies....'
    },
    examinationModules: {
      header: 'Examination set',
      body: 'It is important for students because they can plan their studies....'
    },
    extraHeaders1: {
      header: 'Extra header 1',
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders2: {
      header: 'Extra header 2',
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders3: {
      header: 'Extra header 3',
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders4: {
      header: 'Extra header 4',
      body: 'Here you can add owh headers to H3'
    },
    extraHeaders5: {
      header: 'Extra header 5',
      body: 'Here you can add owh headers to H3'
    },
    gradingCriteria: {
      header: 'Grading Criteria',
      body: 'It is important for students because they can plan their studies....'
    },
    gradingScale: {
      header: 'Grading scale',
      body: 'It is important for students because they can plan their studies....'
    },
    infoContactName: {
      header: 'Info contact name',
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....'
    },
    infoForReregisteredStudents: {
      header: 'Information for re-registered students',
      body: 'It is important for students because they can plan their studies....'
    },
    // languageOfInstructions: {
    //   header: 'Language of instruction',
    //   body: 'It is important for students because they can plan their studies....'
    // },
    learningActivities: {
      header: 'Learning Activities',
      body: 'It is important for students because they can plan their studies....'
    },
    learningOutcomes: {
      header: 'Intended learning outcomes',
      body: 'It is important for students because they can plan their studies....'
    },
    literature: {
      header: 'Literature',
      body: 'It is important for students because they can plan their studies....'
    },
    otherContacts: {
      header: 'Other contacts',
      body:
        'It is important to know Lab supervisors for students because they can plan their studies....'
    },
    otherRequirementsForFinalGrade: {
      header: 'Other requirements for final grade',
      body: 'It is important for students because they can plan their studies....'
    },
    permanentDisability: {
      header: 'Permanent Disability',
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToAddition: {
      header: 'Opportunity to raise an approved grade via renewed examination',
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToCompletion: {
      header: 'Opportunity to complete the requirements via supplementary examination',
      body: 'It is important for students because they can plan their studies....'
    },
    possibilityToCompensate: {
      header: 'Opportunity to compensate a task via another one',
      body: 'Det är viktigt för studenter att veta om det för att planera sina studier för att....'
    },
    preparations: {
      header: 'Specific Preparations',
      body: 'It is important for students because they can plan their studies....'
    },
    prerequisites: {
      header: 'Prerequisites',
      body: 'It is important for students because they can plan their studies....'
    },
    reportingResults: {
      header: 'Results reporting',
      body: '...'
    },
    scheduleDetails: {
      header: 'Schedule Details',
      body: 'It is important for students because they can plan their studies....'
    },
    software: {
      header: 'Software',
      body: 'It is important for students because they can plan their studies....'
    },
    teacher: {
      header: 'Teacher',
      body: 'It is important for students because they can plan their studies....'
    },
    teacherAssistants: {
      header: 'Teacher assistants',
      body: 'It is important for students because they can plan their studies....'
    }
  },
  pages: [
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
      intro: `In this step (3 of 3) a preview of the course memo data with course data is presented as it will be published on the page .... 
      It is possible to go back to make adjustments, to save a draft or publish the information.`
    }
  ],
  sections: {
    contentAndOutcomes: '',
    prep: '',
    reqToFinal: '',
    extra: ''
  },
  pageTitles: {
    new: 'Create and publish new course memo'
    // draft: 'Publish course memo draft',
    // published: 'Edit published course memo',
    // preview: 'Preview course memo draft'
  },
  actionModals: {
    infoCancel: {
      header: 'To be aware of before cancelling!',
      body:
        '<p>Unsaved changes will be lost if you cancel the ....... <br/>  <br/> Do you want to cancel?</p>',
      btnClose: 'No, go back',
      btnConfirm: 'Yes, cancel'
    },
    infoPublish: {
      header: 'To be aware of before publishing!',
      body: `The information will be published on the page Course development and history
        <br/> 
        <br/> 
        Do you want to publish?`,
      btnClose: 'Nej, gå tillbaka',
      btnConfirm: 'Ja, fortsätt publicera'
    },
    infoRemove: {
      header: 'To be aware of before deleting this draft!',
      body: `Deleting the draft cannot be undone. The draft draft will be lost.
      <br/>  
      <br/> 
            Do you want do delete this draft? `,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, cancel'
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
      availableRounds:
        'The following administrative course instances have no published course memo or draft. Select the instances that is included in the course offering:',
      existedDrafts:
        'The following course offerings have saved drafts that are not yet published or have a last version as a published:'
    },
    noSavedDrafts: 'No saved drafts was found for period starting from previous year...'
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnClose: 'Close',
    btnRemove: 'Delete draft',
    btn_preview: 'Preview',
    btn_add_analysis: 'Edit',
    btn_cancel: 'Cancel',
    btn_save: 'Save draft',
    btn_publish: 'Publish',
    btn_back: 'Choose course offering',
    btn_delete: 'Delete',
    btn_save_and_cancel: 'Save draft and cancel',
    btn_copy: 'Copy link to preview',
    btn_show_in_memo: 'Show in course memo',
    btn_hide_in_memo: 'Hide in course memo',
    btn_switch_view_single: 'Switch to “Single View”',
    btn_switch_view_scroll: 'Switch to “Scroll View”'
  },
  extraInfo: {
    courseShortSemester: {
      1: 'Spring ',
      2: 'Autumn '
    },
    labelStartDate: 'Start date',
    // hasSavedDraft: 'Has a published course memo',
    contentHeaders: 'Headers'
  },
  alerts: {
    autoSaved: 'Draft saved',
    errNoChosen:
      'Du must choose a draft or at least one administrative course instance to go further to the next step Edit course memo.',
    errWhileSaving: 'Smth went wrong on api side......',
    warnReplacePm:
      'Observ: Any previously published course memo (see course offering below) will be replaced by the new course memo to be edited.'
  }
}
