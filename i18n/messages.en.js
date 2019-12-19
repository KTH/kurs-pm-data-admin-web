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
    host_name: 'KTH'
  },
  header: {
    courseContent: 'Course contents',
    learningOutcomes: 'Intended learning outcomes',
    equipment: 'Equipment',
    literature: 'Literature',
    additionalRegulations: 'Additional regulations',
    gradingScale: 'Grading scale',
    ethicalApproach: 'Ethical approach',
    examination: 'Examination',
    examinationComment: '+[examination comment (fixed text)]',
    examinationCommentEditable: '+ [examination comment (free text)]',
    supplementaryExam: 'Opportunity to complete the requirements via supplementary examination',
    raiseApprovedGrade: 'Opportunity to raise an approved grade via renewed examination',
    otherRequirementsForFinalGrade: 'Other requirements for final grade',
    examiner: 'Examiner',
    communicationWithTeachers: 'Communication with teachers',
    courseCoordinator: 'Course coordinator ',
    labSupervisors: 'Lab supervisors',
    teacherAssistants: 'Teacher assistants',
    teacher: 'Teacher',
    languageOfInstructions: 'Language of instruction',
    planning: 'Detailed Planning',
    gradingCriteria: 'Grading Criteria'
  },
  pages: [
    {
      title: '1. Choose course offering',
      intro: `Choose a semester and a course offering for the course memo data to be published (step 1 of 3). 
      In the next step (2 of 3), course data will be fetched automatically for the selected semester and course offering. 
      It is there possible to edit some of the course data and course memo data. 
      Preview the table with the course data and course memo data that are about to be published in the last step (3 of 3). 
      The course data with the course memo data will then be published on the page ....
      `
    },
    {
      title: '2. Edit course memo data',
      intro: `In this step (2 of 3) course memo data and course memo shall be uploaded, 
      changes to the chosen course offering is summarized and some of the course data are reviewed and adjusted.`
    },
    {
      title: '3. Review and publish',
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
  actionModals: {
    infoCancel: {
      header: 'To be aware of before cancelling!',
      body:
        '<p>Unsaved changes will be lost if you cancel the publishing of ....... <br/>  <br/> Do you want to cancel?</p>',
      btnClose: 'No, go back',
      btnConfirm: 'Yes, cancel'
    }
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btn_preview: 'Preview',
    btn_add_analysis: 'Edit',
    btn_cancel: 'Cancel',
    btn_save: 'Save draft',
    btn_publish: 'Publish',
    btn_back: 'Choose course offering',
    btn_delete: 'Delete',
    btn_save_and_cancel: 'Save draft and cancel',
    btn_copy: 'Copy link to preview'
  }
}
