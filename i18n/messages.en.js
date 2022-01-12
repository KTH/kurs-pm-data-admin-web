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
    contact_support: 'Contact',
    for_questions: 'for questions',
    friendly_message_have_not_rights: 'Missing permission to use About the course administration tool.',
    look_at_list_of_kopps_admin:
      'If you want to know who is the Kopps administrator at your school, look at the list here:',
    message_have_not_rights: `Missing permission to use About the course administration tool. Permission is automatically granted to those who are registered in KOPPS as an examiner, course coordinator or teacher for the course.`,

    /**
     * Message keys
     */
    service_name: 'kurs-pm-data-admin-web',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.871898',
    locale_text: 'This page in English',
    main_site_name: 'Administer About the course ',
    site_name: 'Administration of Course Memos',
    host_name: 'KTH',
    skip_to_main_content: 'Skip to main content',

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
    page_header_heading_course_round: 'Course offering',
  },
  sourceInfo: {
    addNewHeading: 'Name heading',
    fetched: 'Fetched', // IF NOT EDITABLE
    '(c)': 'from common course information',
    '(r)': 'from course round information',
    '(s)': 'from course syllabus',
    errorEmptyHeading: 'You need to name the header',
    mandatory: 'Always included',
    mandatoryAndEditable: 'Always included',
    mandatoryForSome: 'Included for some courses',
    includeInMemo: {
      section: 'Include',
      subSection: 'Include additional section',
    }, // RUBRIK/ADDITION
    noInfoYet: {
      section: 'No information is inserted. Click on "Edit" to add information.',
      subSection: 'No information is inserted. Click on "Edit" to add information.',
    },
    notIncludedInMemoYet: {
      section:
        'There is content that is not included. Check "Include" to make the contents visible in the published course memo.',
      subSection:
        'There is content that is not included. Check "Include" to make the contents visible in the published course memo.',
    },
    nothingFetched: {
      mandatoryAndEditable: 'No information was available to fetch, click Edit to add own text',
      mandatory:
        'There was no content to fetch to this course memo. The heading will despite that be included in the published course memo. Read more on how to change fetched information in the information icon next to the heading above.',
      mandatoryForSome:
        'There was no content to fetch to this course memo. The heading will not be included in the published course memo.',
      optional:
        'There was no content to fetch to this course memo. Read more on how to change fetched information in the information icon next to the heading above. You can also choose to exclude the heading from the published course memo.',
    },
    insertedSubSection: '(Section below is not part of the syllabus)',
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
    gradingCriteria: 'Grading criteria/assessment criteria',
    gradingScale: 'Grading scale',
    infoForReregisteredStudents: 'Changes of the course before this course offering',
    learningActivities: 'Learning activities',
    learningOutcomes: 'Intended learning outcomes',
    literature: 'Literature',
    otherContacts: 'Other contacts',
    otherRequirementsForFinalGrade: 'Other requirements for final grade',
    permanentDisability: 'Support for students with disabilities',
    possibilityToAddition: 'Opportunity to raise an approved grade via renewed examination',
    possibilityToCompletion: 'Opportunity to complete the requirements via supplementary examination',
    possibilityToCompensate: 'Alternatives to missed activities or tasks',
    preparations: 'Specific preparations',
    prerequisites: 'Recommended prerequisites',
    reportingResults: 'Reporting of exam results',
    scheduleDetails: 'Detailed plan',
    software: 'Software',
    teacher: 'Teacher',
    teacherAssistants: 'Teacher assistants',
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
      <p><b>If there is no content</b> the heading will not be visible in the published course memo.</p>`,
    },
    commentAboutMadeChanges: {
      body: `<p><b>Made changes</b> can be seen as a change log containing the changes made to a published course memo. The information is not public. Made changes shall include a short description of the changed sections and the reason of the changes. The system itself saves date and time of each published change to this course memo.</p>
      <p><b>The section helps KTH</b> to find and understand the changes made to a published course memo.</p>`,
      help: `<p></p>
      <p></p>`,
    },
    communicationDuringCourse: {
      body: `<p><b>Communication during course</b> describes how the student should communicate with the teachers and the other personnel before and during the course offering. Communication during course also describes who to contact regarding the most common questions and issues.</p>
		<p><b>The information helps the student</b> to understand how to communicate on this course. Information in this section makes the communication more efficient on this course and reduces the number of unnecessary questions.</p>
		<p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Communication during course" and check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe how to communicate before and during this course offering in the section "Communication during course". For example, you can refer to the teachers regarding questions before start of the course and to Canvas for dialogue during the course. If you want different types of questions to be handled differently, describe the different ways to communicate in short.</p>
		<p>Don´t write contact information in this section. Instead you refer to the sections "Course coordinator", "Teacher", "Teacher assistants", "Examiner" and "Other contacts".</p>
		<p>Uncheck "Include heading" if there is no reason to inform about communication during course.</p>`,
    },
    courseContent: {
      body: `<p><b>Course contents</b> describes the subjects and the general abilities that is discussed or practised on the course.</p>
      <p><b>The information helps the student</b> to understand what concepts, subjects, abilities etc. to read up on before and during the courses. 
      In that way, course contents helps the student to prepare both before and during the course.</p>
      <p><b>Contents can be edited</b> in Kopps. Changes of course contents is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page 
      <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>`,
    },
    courseCoordinator: {
      body: `<p><b>Course coordinator</b> holds the contact details to the course coordinator on this course offering.</p>
      <p><b>The information helps the student</b> to understand who and how the student shall contact the course coordinator for questions and other issues.</p>
	  <p><b>Edit the contents</b> in Kopps. Course coordinator is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    ethicalApproach: {
      body: `<p><b>Ethical approach</b> describes the KTH ethical values during studies and what is allowed and what is not allowed during this course offering.</p>
      <p><b>The information helps the student</b> to know what ethical values, rights and obligations to relate to during the studies. 
      Clearly expressed ethical values increases the student´s trust for the education and helps the student to avoid breaking the regulations.</p>
      <p><b>The content can be edited by</b> including an additional section (see Edit the course specific contents). The upper text is fixed and is a part of the template for course memo.</p>
      <p><b>Edit the course specific contents</b> by clicking on the button "Edit". Enter information about "Ethical approach" and check "Include additional section" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
    },
    ethicalApproachSubSection: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p>There are two sections under the "Ethical approach" heading. First there is a fixed text that will be included in all published course memos. 
      It is not possible to edit that general text.<p>
      <p>You can inform the student about course specific information regarding ethical approach in the second section. 
      Here you can describe any values and regulations applicable for the activities in this course offering, for example group projects, assignments, programming tasks etc.</p>
      <p>Read more about the KTH <a href="https://intra.kth.se/polopoly_fs/1.831693.1562754447!/Ethical_Policy.pdf " target="_blank">Ethical policy</a> to find more detailed support and information regarding ethical approach.</p>
      <p>You can also find useful information in the EECS <a href="https://www.kth.se/en/eecs/utbildning/hederskodex/inledning" target="_blank">Code of honour for students and teachers</a>. 
      If this course is offered by the EECS school you can insert a web link to the same web page.</p>
      <p>Uncheck "Include section" if there is no course specific information regarding ethical approach on this course.</p>`,
    },
    equipment: {
      body: `<p><b>Equipment</b> describes any equipment that is necessary to take the course, but is not provided by KTH. 
      Pencils and other writing materials is not treated as equipment.</p>
      <p><b>The information helps the student</b> to obtain the necessary equipment before the start of the course offering. 
      Information about euipment should be available at least eight weeks before start of the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about "Equipment" and check "Include section" to make the information visible on the published course memo. 
      Any general information about equipment on this course in Kopps is automatically fetched to this course memo. You can edit that information, but it will only be changed for this particular course offering and course memo. 
      It will not be automatically transferred to Kopps or any other course memo. 
      General information about "Equipment" on this course is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the equipment that is necessary to take the course, but is not provided by KTH in the "Equipment" section. 
      Pencils and other writing materials is not treated as equipment.</p>
      <p>If this is a new course memo the system will automatically provide you with the information from Kopps that is valid for all course offerings on this course. 
      You can choose to keep that information, or you can enter information about equipment that is valid only to this course offering. 
      Just replace the provided information with your own.</p>
      <p>Uncheck "Include heading" if equipment is irrelevant for this course.</p>`,
    },
    examiner: {
      body: `<p><b>Examiner</b> holds the contact details to the examiner on this course offering.</p>
      <p><b>The information helps the student</b> to understand who and how the student shall contact the examiner for questions and other issues.</p>
	  <p><b>Edit the contents</b> in Kopps. Examiner is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    examination: {
      body: `<p><b>Examination</b> describes the examination of the course and the examination details of each course component.</p>
      <p><b>The information helps the student</b> to plan for taking the course. It also helps the student to prepare for and plan for each of the examination session on this course offering.</p>
      <p><b>The content can be edited</b> partly in the course syllabus in Kopps (the fixed text at the top) and partly in this course memo, by including an additional section. Normally it is not possible to change the fixed texts of Examination because the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page <a href=" https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>
      <p><b>Edit the contents of examination details</b> by clicking on the button "Edit". Enter information about "Examination" and check "Include additional section" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
    },
    examinationSubSection: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p>There are two sections under the "Examination" heading. First there is an examination overview that is fetched from the course syllabus. This text will be published in this course memo.</p>
      <p>Describe the details of the examination in the second section. If this is a new course memo, that is not a new version or copied from another course memo, the system will provide you with preformatted subheadings of each module. 
      Consider to describe the following information beneath each subheading:</p>
      <p>- how the examination is performed</p><p>- the parts of the examination</p><p>- any deadlines</p>
      <p>- allowed aids during the examination</p><p>- the terms for collaboration and group projects</p><p>- ...and any other important information regarding the details of the examination.</p>
      <p>You can also describe if there are alternative ways to complete each module, for example with quizzes and partial exams, the use of bonus points and similar.</p>
      <p>The foundations of the examination must not be changed relative to the course syllabus or a previous version of this course memo. 
      You should therefore consider every change of the information in the "Examination" section after the first version of this course memo is published. 
      Make sure to review the contents of the second added section of "Examination" if this course memo is a new version of a published course memo or if it is copied from a previous published course memo. 
      Some details and dates may have changed. The fetched fixed text in the first section of "Examination" is always correct, even for copied course memos.</p>
      <p>It is not mandatory to use the provided subheadings as a structure for the examination details. Just replace the subheadings with your own if you find that better.</p>
      <p>The actual exams with instructions should be described in Canvas or a corresponding learning management system. 
      Deadlines as well as time and place for exams can also be included in the "Detailed plan" section to give the students an overview of all the activities on this course offering.</p>`,
    },
    extraHeaders1: {
      body: `<p><b>Information in an added section</b> can help students on this course offering to prepare for and plan for taking the course with help of information that doesn´t fit in another ordinary section related to "Content and learning outcomes" in this course memo.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Name the heading in the "Name new section" field and enter information about it in the input field below. Check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel for further guidance.</p>
			<p>To remove an added section, click on the button "Edit". Then click on "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
      help: `<p>Describe information that is related to "Content and learning outcomes", but does not fit into any of the ordinary sections, in an added section. Examples of such information are "Concepts", "Connection to qualitative targets" and "Pedagogical disposition of the course".</p>
			<p>If you no longer want an added section to be visible in this course memo, either uncheck "Include heading", or click on the button "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
    },
    extraHeaders2: {
      body: `<p><b>Information in an added section</b> can help students on this course offering to prepare for and plan for taking the course with help of information that doesn´t fit in another ordinary section related to "Preparations before course start" in this course memo.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Name the heading in the "Name new section" field and enter information about it in the input field below. Check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel for further guidance.</p>
			<p>To remove an added section, click on the button "Edit". Then click on "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
      help: `<p>Describe information that is related to "Preparations before course start", but does not fit into any of the ordinary sections, in an added section. Examples of such information are "Specific prerequisites", "Course registration" and "Learning management system".</p>
			<p>If you no longer want an added section to be visible in this course memo, either uncheck "Include heading", or click on the button "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
    },
    extraHeaders3: {
      body: `<p><b>Information in an added section</b> can help students on this course offering to prepare for and plan for taking the course with help of information that doesn´t fit in another ordinary section related to "Examination and completion" in this course memo.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Name the heading in the "Name new section" field and enter information about it in the input field below. Check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel for further guidance.</p>
			<p>To remove an added section, click on the button "Edit". Then click on "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
      help: `<p>Describe information that is related to "Examination and completion", but does not fit into any of the ordinary sections, in an added section. Examples of such information are "Appeal" and "Link to sample quizzes and exams".</p>
			<p>If you no longer want an added section to be visible in this course memo, either uncheck "Include heading", or click on the button "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
    },
    extraHeaders4: {
      body: `<p><b>Information in an added section</b> can help students on this course offering to prepare for and plan for taking the course with help of information that doesn´t fit in another ordinary section related to "Further information" in this course memo.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Name the heading in the "Name new section" field and enter information about it in the input field below. Check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel for further guidance.</p>
			<p>To remove an added section, click on the button "Edit". Then click on "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
      help: `<p>Describe information that is related to "Further information", but does not fit into any of the ordinary sections, in an added section. Examples of such information are "Appeal", "Course evaluation and course analysis" and "Maps/Find your teaching premises".</p>
			<p>If you no longer want an added section to be visible in this course memo, either uncheck "Include heading", or click on the button "Remove added heading" and confirm the deletion of the heading and its contents.</p>`,
    },
    gradingCriteria: {
      body: `<p><b>Grading criteria/assessment criteria</b> shall connect the grading scale to levels of achievement of the intended learning outcomes.</p>
        <p><b>The information helps the student</b> to understand how the grading criteria and assessment criteria relate to the intended learning outcomes. 
        It helps the student to understand what he or she must do and have the knowledge about to achieve each grade on the course. 
        Clearly expressed grading criteria and assessment criteria also motivate the student.</p>
        <p><b>Edit the contents </b> by clicking on the button "Edit". Enter information about "Grading criteria/assessment criteria" and check "Include heading" to make the information visible on the published course memo. 
        Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Grading criteria/assessment criteria shall connect the grading scale to levels of achievment of the intended learning outcomes, where a passed grade corresponds to a basic achievemnt of the intended learning outcomes. 
      Grading criteria/assessment criteria for a higher grade may concern the quality of the performance, the difficulty, how parts of the course contents are combined and the level in the Bloom´s taxonomy. 
      The examination shall be clarly connected to the criterias. If there is more than one course component in the course, it must be explicit what intended learning outcome that is examined in what course component. 
      It must also be clear how the final grade is balanced by the different grades on each course component and how the grade of each course component is balanced by the assessments of the grading criterias.</p>
      <p>Read more about grading criteria/assessment criteria and find examples of <a href="https://intra.kth.se/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Grading criteria</a> (only in Swedish, opens in new tab).</p>`,
    },
    gradingScale: {
      body: `<p><b>Grading scale</b> describes the final mark grading scale of the course.</p>
        <p><b>The information helps the student to</b> understand what kind of grade the student can expect after completing the course.</p>
        <p><b>It is not possible to change the grading scale.</b> A new grading scale requires a new course with a new course code. 
        Read more about changing contents of course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).
      </p>`,
    },
    infoForReregisteredStudents: {
      body: `<p><b>Changes of the course before this course offering</b> describes the relevant conclusions from previous course evaluations and course analysis and what changes that have actually been implemented before this course offering.</p>
      <p><b>The information helps the student</b> to understand what changes of the course that has been made to this course offering.
      This is especially important for re-registered students who needs to be informed about any important differences to the previous course offering. 
      Describing the changes is a good way to show the students that the course development is important and that it actually helps to improve the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Changes of the course before this course offering" and check "Include" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the changes that have been made to the course before this course offering in the section "Changes of the course before this course offering". 
      Some relevant conclusions from previous course evaluations and course analysis could also be important to point out to help the student to plan and prepare for the course. 
      The course memo as a document is one of several mediums to inform the students about the results from course evaluations and course analysis and the decisions that followed.</p>
      <p>Uncheck "Include" if information about "Changes of the course before this course offering" is irrelevant for this course.</p>`,
    },
    learningActivities: {
      body: `<p><b>Learning activities</b> describes the types of planned activities on the course and what is important to know about each learning activity. 
      For example, learning activities defines what a seminar or a laboration is on this particular course.</p>
      <p><b>The information helps the student</b> to understand the activities and to do the necessary preparations prior to the activity. 
      Each activity type may have different meanings on different courses. Well described learning activities sets the right expectations on each type of activity.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about learning activities and check "Include" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the planned types of learning activities on the course in the section "Learning activities". 
      Use an established term for each type and repeat the term throughout the course memo. 
      Describe what the learning activity means for this particular course and what is important for the student to know about it. 
      You can add information about how many of each activity type and how they are distributed over the course. </p>
      <p>If the pedagogical disposition of the course is relevant for planning and preparations it can also be described in this section.</p>
      <p>Uncheck "Include" if information about learning activities is irrelevant for this course.</p>`,
    },
    learningOutcomes: {
      body: `<p><b>Intended learning outcomes</b> clarifies what knowledge, what skills, which evaluation abilities and approaches the student needs to demonstrate after taking the course.</p>
      <p><b>The information helps the student</b> to understand what targets the student needs to achieve for a passed grade. Intended learning outcomes helps the student to plan the course. 
      The following information in this course memo, in many ways, relates to the intended learning outcome. Therefore, it is important that the information is unambiguously formulated.</p>
      <p><b>Contents can be edited</b> in Kopps. 
      Changes of intended learning outcome is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>`,
    },
    literature: {
      body: `<p><b>Literature</b> describes the compulsory course literature on this course offering.</p>
      <p><b>The information helps the student</b> to obtain the necessary literature before the start of the course offering. 
      For students with disablities it is important to know about the compulsory course literature before the course to get it as talking books. 
      The information should therefore be available at least eight weeks before start of the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about "Literature" and check "Include section" to make the information visible on the published course memo. 
      Any general information about literature on this course in Kopps is automatically fetched to new course memos. 
      You can edit that information, but it will only be changed for this particular course offering and course memo. 
      It will not be automatically transferred to Kopps or any other course memo. 
      General information about "Literature" on this course is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the compulsory course literature on this course in the "Literature" section. 
      If this is a new course memo the system will automatically provide you with the information from Kopps that is valid for all course offerings on this course. 
      You can choose to keep that information, or you can enter information about course literature that is valid only to this course offering. 
      Just replace the provided information with your own.</p>
      <p>Make a list of the course literature with information about the author, year of publication, title and name of publisher. 
      Also include references to where the course literature could be found in digital form, for example in Canvas.</p>
      <p>Many students want to acquire the course literature before the course start. 
      Students with disabilities need to know the course literature well in advance of the course start to get it as talking books. 
      The information should therefore be available at least eight weeks before start of the course.</p>
      <p>If there is no compulsory course literature on this course it is important to mention that to reduce unnecessary questions and to avoid the students go looking for the information elsewhere in vain.</p>`,
    },
    otherContacts: {
      body: `<p><b>Other contacts</b> describes the contact details to personnel and functions, other than the contacts mentioned above, the students may have to contact before or during this course offering. Course administrators, lab supervisors and project supervisors are examples of "Other contacts".</p>
			<p><b>The information helps the student</b> to under stand who and how the student shall contact regarding questions and issues not relevant to the roles and contacts on this course offering mentioned above.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Other contacts" and check "Include heading" to make the information visible on the published course memo. Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the contact details to personnel and functions other than the contacts mentioned above. Enter name, mail address and phone number. Describe in short the questions and issues each contact handles.</p>
			<p>Contacts already mentioned in the "Course coordinator", "Teacher", "Teacher assistants" and "Examiner" sections should not be repeated in this section.</p>
			<p>Uncheck "Include heading" if there is no reason to inform about other contacts.</p>`,
    },
    otherRequirementsForFinalGrade: {
      body: `<p><b>Other requirements for final grade</b> describes additional requirements for a final grade than written in the "Examination" section for the course, for example attendance requirements.</p>
      <p><b>The information helps the student,</b> depending on the contents of "Other requirements for final grade", to plan and prepare for their studies.</p>
      <p><b>Contents can be edited</b> in Kopps. Changes of "Other requirements for final grade" is restricted by certain regulations since the information is part of the legally binding course syllabus. 
      Read more about changing contents of course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab). </p>
      <p><b>If there is no content</b> the heading will not be visible in the published course memo.</p>`,
    },
    permanentDisability: {
      body: `<p><b>Support for students with disabilities</b> describes what a student with disabilities is eligible to. 
      The information describes the rights and the possibilities for students with different types of needs and how they can apply for compensatory support.</p>
      <p><b>The information helps the student</b> with disabilities to know if he or she is entitled for compensatory support during the studies on this course. With help from this information the students with disabilities will have the confidence to take the course based on their own capabilities. </p>
      <p><b>The content can be edited by</b> including an additional section (see Edit the course specific contents). The upper text is fixed and is a part of the template for course memo.</p>
      <p><b>Edit the course specific contents</b> by clicking on the button "Edit". 
      Enter information about "Support for students with disabilities" and check "Include additional section" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
    },
    permanentDisabilitySubSection: {
      body: `<p> </p>
      <p> </p>`,
      help: `<p>There are two sections under the "Support for students with disabilities" heading. 
      First there is a fixed text that will be included in all published course memos. 
      It is not possible to edit that general text. 
      There is a web link in the fixed text that links to the KTH offical information about support for students with disabilities. 
      There, students can find information about compensatory support and how to apply for it. </p>
      <p>You can inform the student about course specific information regarding support for students with disabilities in the second section. 
      You can inform the students about compensatory support during examination or aother support during the studies on this course. 
      Read more about <a href="https://intra.kth.se/utbildning/utbi/genomfora-utbildning/hantera-stodinsatser-vid-examination-av-studenter-med-funktionsnedsattning" target="_blank">hantera stödinsatser vid examination av studenter med funktionsnedsättning</a>. 
      The page is in Swedish but there are some helpful documents in English.</p>
      <p>Uncheck "Include section" if there is no course specific information regarding support for students with disabilities preparations on this course.</p>`,
    },
    possibilityToAddition: {
      body: `<p><b>Opportunity to raise an approved grade via renewed examination</b> describes if it is possible to raise an approved grade on this course, the terms for raising it and how to apply for raising an approved grade. </p>
      <p><b>The information helps the student</b> to understand if it is possible to raise an approved grade via renewed examination and if that is the case, the terms for that.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about "Opportunity to raise an approved grade via renewed examination" and check "Include heading" to make the information visible on the published course memo. 
      Any general information about opportunity to raise an approved grade via renewed examination on this course in Kopps is automatically fetched to new course memos. 
      You can edit that information, but it will only be changed for this particular course offering and course memo. It will not be automatically transferred to Kopps or any other course memo. 
      General information about "Opportunity to raise an approved grade via renewed examination" on this course is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe if it is possible to raise an approved grade via renewed examination on this course in this section and the terms for that. Also describe how the student can apply for a renewed examination.</p>
      <p>If this is a new course memo the system will automatically provide you with the information from Kopps that is valid for all course offerings on this course. 
      You can choose to keep that information, or you can enter information about the opportunity to raise an approved grade via renewed examination that is valid only to this course offering. 
      Just replace the provided information with your own.</p>
      <p>If it is not possible to raise an approved grade on this course it is still valuable for student to know that. Uncheck "Include heading" if you despite that don´t want to include the information in this course memo</p>`,
    },
    possibilityToCompletion: {
      body: `<p><b>Opportunity to complete the requirements via supplementary examination</b> describes if it is possible to complete the requirements via supplemantary examination and if it possible to raise the grade to E or a higher grade. 
      All modules/items in a course with differentiated grading scale must offer an opportunity to complete the requirements via supplementary examination from Fx to passed. 
      Opportunity to complete the requirements via supplementary examination can be offered by the examiner for modules with grading scale P/F.</p>
      <p><b>The information helps the student</b> to understand if it is possible to complete the requirements via supplemantary examination and if that is the case, the terms for that.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about the opportunity to complete the requirements via supplementary examination and check "Include heading" to make the information visible on the published course memo. 
      Any general information about opportunity to complete the requirements via supplementary examination on this course in Kopps is automatically fetched to new course memos. 
      You can edit that information, but it will only be changed for this particular course offering and course memo. It will not be automatically transferred to Kopps or any other course memo. 
      General information about "Opportunity to complete the requirements via supplementary examination" on this course is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe if it is possible to complete the requirements via supplementary examination on this course in this section and terms for that. 
      Also describe if it is possible to complete the requirements via supplementary examination on each module/item.  
      All modules/items in a course with differentiated grading scale must offer an opportunity to complete the requirements via supplementary examination from Fx to passed. 
      Opportunity to complete the requirements via supplementary examination can be offered by the examiner for modules with grading scale P/F.</p>
      <p>If this is a new course memo the system will automatically provide you with the information from Kopps that is valid for all course offerings on this course. 
      You can choose to keep that information, or you can enter information about the opportunity to complete the requirements via supplementary examination that is valid only to this course offering. 
      Just replace the provided information with your own.</p>
      <p>It is often better to describe opportunity to complete the requirements via supplementary examination for the modules under each sub heading to the heading "Examination" above in this course memo.</p>
      <p>Uncheck "Include heading" if "Opportunity to complete the requirements via supplementary examination" is irrelevant for this course.</p>`,
    },
    possibilityToCompensate: {
      body: `<p><b>Alternatives to missed activities or tasks</b> describes if alternatives to mandatory activities or tasks are possible and the terms for that.</p>
      <p><b>The information helps the student</b> to understand what will happen if he or she gets sick. It will also help the student to plan the course in parallel with other commitments, like another course. With information about alternatives to missed activities or tasks the student can easily prioritize all the activities.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Reporting of exam results" and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe if alternatives to missed activities or tasks are possible on this course in the "Alternatives to missed activities or tasks" section. 
      If it is possible, describe the alternatives in the case when students miss a mandatory activity or task, for example if the student miss a mandatory study visit.</p>
      <p>Remember that any other examination format than the ordinary must be written in the "Examination comment" section of the course syllabus.</p>
      <p>Uncheck "Include heading" if "Alternatives to missed activities or tasks" is irrelevant for this course.</p>`,
    },
    preparations: {
      body: `<p><b>Specific preparations</b> describes the most important preparations for the students before start of this course offering.</p>
      <p><b>The information helps the student</b> to plan for and prepare for the course, for example by ordering the course literature, 
      rehearse specific theories from "Specific prerequisites", rehears parts from "Recommended prerequisites", install software etc.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Specific preparations" and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the most important preparations for the students in the "Specific preparations" section. 
      Write things that are important to know or to do before the start of the course. 
      That could be ordering the course literature, rehearse specific theories from "Specific prerequisites", rehears parts from "Recommended prerequisites", install software etc.</p>
      <p>Preparations in general should be described in the "Learning activities" section if it is related to the different types of activity types or described in the "Detailed plan" section if it is related to specific reading guidelines prior to each learning activity.</p>
      <p>Uncheck "Include heading" if there is no reason to inform about specific preparations on this course.</p>`,
    },
    prerequisites: {
      body: `<p><b>Recommended prerequisites</b> describe what the teacher expects the student to know before the start of the course.</p>
      <p><b>The information helps the student</b> to understand what knowledge that is important to take this course. Well defined "Recommended prerequisites" makes it easy for the student to rehears the right theories, models etc. in time for the start of this course offering.</p>
      <p><b>Edit the contents</b> in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a>. The information is administered by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>.</p>`,
    },
    reportingResults: {
      body: `<p><b>Reporting of exam results</b> describes how and when the results on this course offering is registered and reported. 
      It contains information of where and when the students can see their results on this course.</p>
      <p><b>The information helps the student</b> to understand where and when they can find their results on this course. With that information the student can take any reexams in considerations. 
      It is also important for the student to know if he or she is entitled to student grants and loans.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about "Reporting of exam results" and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe what the student needs to know about reporting of exam results in this section. 
      Describe where and when the student can find the results, both for modules and the final grade on the course. 
      It is particularly important to describe this if the routines differs from other courses, for example if the results will be reported later than what is expected. 
      The students should be informed of the results no later than three weeks or fifteen working days after the exam.</p>
      <p>Uncheck "Include heading" if there is no reason to inform about reporting of exam results on this course.</p>`,
    },
    scheduleDetails: {
      body: `<p><b>Detailed plan</b> is an overview of the learning activities and examinations on the course, preferably in a chronological order. 
      The detailed plan contains information about each activity and what preparations that are recommended prior to each activity.</p>
      <p><b>The information helps the student</b> to plan for the studies and take the course effeciently. 
      A clear plan illustrates the order of the activities on the course and that makes it easy for the student to do proper preparations with the right timing.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". 
      Enter information about the detailed plan and check "Include" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
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
      <p>If there are preparations that are particularly important, you can highlight them in the "Specific preparations" section in this course memo.</p>`,
    },
    software: {
      body: `<p><b>Software</b> describes what software and what version of the software that is used on the course. 
      Software should also include instructions or references and web links to instructions that describes where the software is found and how it is installed.</p>
      <p><b>The information helps the student</b> to get access to the correct software that is neceasary to complete the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information about "Software" and check "Include heading" to make the information visible on the published course memo. 
      Expand the "Show guidance" panel (after you have clicked the edit-button) for further guidance on how to write the content.</p>`,
      help: `<p>Describe the software that is used in the course in the "Software" section. Include references or web links to resources where the software can be downloaded from and where to find installation instructions.</p>
      <p>Uncheck "Include heading" if software is irrelevant for this course.</p>`,
    },
    teacher: {
      body: `<p><b>Teacher</b> holds the contact details to the teachers on this course offering.</p>
      <p><b>The information helps the student</b> to understand who and how the student shall contact the teachers for questions and other issues.</p>
	  <p><b>Edit the contents</b> in Kopps. Teacher is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    teacherAssistants: {
      body: `<p><b>Teacher assistants</b> holds the contact details to the teacher assistants on this course offering.</p>
      <p><b>The information helps the student</b> to understand who and how the student shall contact the teacher assistants for questions and other issues.</p>
	  <p><b>Edit the contents</b> in Kopps. Teacher assistants is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
  },
  pagesCreateNewPm: [
    {
      title: 'Choose course offering',
      intro: `Choose a semester and a course offering for the course memo to be published (step 1 of 3). 
      You can choose to start from a completely empty KTH course memo template or start from a copy of a course memo from a previous course offering. 
      In the next step (2 of 3) you can edit the course memo. 
      Preview the course memo in the last step (3 of 3) and then publish it as a subpage to About course/Prepare and take course.
      `,
    },
    {
      title: 'Edit course memo',
      intro: '',
    },
    {
      title: 'Preview and publish',
      intro: '',
    },
  ],
  pagesChangePublishedPm: [
    {
      title: 'Choose a course memo',
      intro: `Start by selecting the course memo you want to change (step 1 of 3). In the next step (2 of 3) you will be able to edit the course memo. In the last step (3 of 3) you can review the course memo and then publish it as a new version on the page: About course/Prepare and take course.`,
    },
    {
      title: 'Edit course memo',
      intro: '',
    },
    {
      title: 'Preview and publish',
      intro: '',
    },
  ],
  sectionsLabels: {
    contentAndOutcomes: 'Content and learning outcomes',
    prep: 'Preparations before course start',
    reqToFinal: 'Examination and completion',
    extra: 'Further information',
    contacts: 'Contact',
  },
  pageTitles: {
    new: 'Create and publish course memo',
    published: 'Edit published course memo',
  },
  actionModals: {
    changeLadokRoundIds: {
      header: 'Add course instances',
      body: '',
      btnClose: 'Cancel',
      btnConfirm: 'Save',
    },
    infoCancel: {
      header: 'To be aware of before cancelling!',
      body: `The changes made in this course memo will be deleted if you cancel. The last published version of this course memo will remain unchanged.
        <br/>
        <br/>
        Do you want to cancel?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, cancel',
    },
    infoFinish: {
      header: 'To be aware of before exit!',
      body: `Drafts are saved only on the page "Edit course memo" (step 2).
        <br/>
        <br/>
        Saved drafts are displayed in the "Saved drafts" section on this page. You can choose to delete a draft or to continue editing the selected draft.
        <br/>
        <br/>
        Do you want to exit?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, exit',
    },
    infoSaveAndFinish: {
      header: 'To be aware of before exit!',
      body: `The draft is saved.
        <br/>
        <br/>
        Saved drafts are displayed on the page "Choose course offering" (steg 1) in the "Saved drafts" section. 
        Saved drafts can be deleted by selecting the draft and then click on the "Delete draft" button.
        <br/>
        <br/>
        Do you want to exit?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, exit',
    },
    infoPublish: {
      header: 'To be aware of before publishing!',
      body: `The information will be published as a subpage at: About course/Prepare and take course.
        <br/> 
        <br/> 
        Do you want to publish?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, publish',
    },
    infoPublished: {
      header: 'To be aware of before publishing!',
      body: `A new version of the course memo will be published as a subpage at: About course/Prepare and take course.
        <br/> 
        <br/> 
        Do you want to publish?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, publish',
    },
    infoRemove: {
      header: 'To be aware of before deleting this draft!',
      body: `Deleting the draft cannot be undone. The draft will be lost.
      <br/>
      <br/>
      Do you want do delete this draft?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, delete',
    },
    newSectionRemove: {
      header: 'To be aware of before deleting this heading!',
      body: `Deleting the heading and its content cannot be undone. The added section will be lost.
      <br/>
      <br/>
      Do you want do delete this heading and its content?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, delete',
    },
    rebuildDraftOfPublished: {
      header: 'To be aware of before you reset the contents!',
      body: `If you reset the contents to the latest published version of this course memo your current changes will be lost.
      <br/><br/>
      Do you want to reset the contents to the latest published version of this course memo?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, reset to the latest published version',
    },
  },
  info: {
    chooseSavedDraft: 'Saved drafts',
    createNew: 'Choose course offering',
    choosePublishedMemo: 'Choose course memo',
    chooseSemester: {
      label: 'Choose semester',
    },
    chooseRound: {
      header: 'Choose course offering',
      body: `<p>Choose all the administrative course instances that is included in the course offering. 
      Students are admitted to an administrative course instance. 
      Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. 
      A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. 
      Several administrative course instances are grouped to one course offering.</p>`,
      addRounds: {
        label: 'Select the course offering(s) to include in memo:',
        infoText: 'The following administrative course instances have no published course memo or draft',
      },
      availableRounds: {
        label: 'Select the instances that is included in the course offerings',
        infoText: 'The following administrative course instances have no published course memo or draft',
      },
      existedDrafts: {
        label: 'Select a draft and click on the button Edit to continue edit the draft:',
        infoText: 'The following course offerings have drafts that are not yet published',
      },
      publishedMemos: {
        label: 'Select a course memo you want to edit: ',
        infoText: 'Course memos which are published',
      },
    },
    createFrom: {
      labelBasedOn: 'Start from',
      labelAllPrevMemos: 'Choose course memo to copy:',
      infoTextForMemos: 'Listed course memos are published for previous course offerings',
      basedOnStandard: 'Empty KTH course memo template',
      basedOnAnotherMemo: 'Copy of a course memo from a previous course offering',
    },
    publishedHasDraft: ' (has unpublished changes)',
    errKoppsRounds:
      'Could not fetch all available administrative course instances because of error in Kopps. Try to refresh page',
    noRoundsToAdd:
      'All administrative course instances this semester has a published course memo or a draft of a course memo. Therefore, there is no administrative course instance to add to this course memo. View saved drafts on this page or published course memos on the page "About course memo" for this course.',
    noCourseRoundsAvailable:
      'All administrative course instances the chosen semester are already included in a course offering that has a published course memo or draft.',
    noSavedDrafts: 'There are no saved drafts.',
    noSemesterAvailable:
      'There are no semesters to choose since there are no current or future course offerings for this course. Check Kopps if you expect course offerings to create course memos for.',
    noPrevPublishedAvailable: 'There are no published course memos for previous course offerings.',
    noPublishedMemos:
      'There are no published course memos for this semester, the previous semester or any future semester.',
  },
  changePublishedInfo: {
    choosePublishedMemo: 'Choose course memo',
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Add heading to ',
    btnClose: 'Close',
    btnRemove: 'Delete draft',
    btnRemoveHeading: 'Remove added heading',
    btnFinish: 'Exit',
    btnSaveAndFinish: 'Exit (save draft)',
    closeEditor: 'Close edit mode',
    preview: 'Preview',
    previewPdf: 'Preview PDF',
    edit: 'Edit',
    cancel: 'Cancel',
    save: 'Save',
    saveDraft: 'Save draft',
    publish: 'Publish',
    goToRounds: 'Choose course offering',
    save_and_cancel: 'Save draft and cancel',
    btn_copy: 'Copy link to preview',
    showGuidance: 'Show guidance',
  },
  extraInfo: {
    aboutMemoLanguage: {
      sv: `The language of this course memo is Swedish since all chosen administrative course instances have Swedish as the language of instruction. It is not possible to add an English administrative course instance to a course memo in Swedish. If you want to combine administrative course instances in both Swedish and English you have to delete the draft and create a new draft with both Swedish and English administrative course instances.`,
      en: `The language of this course memo is English since at least one of the chosen administrative course instances have English as the language of instruction. It is possible to add both administrative course instances with Swedish and English as the language of instruction.`,
    },
    cannotMergeLanguage: 'Cannot be chosen, read abode: Language of memo',
    commentChanges: 'Describe changes made in this version:',
    contentHeaders: {
      title: 'Headings',
      intro: `<p>All fixed and optional sections in this course memo is listed down below. The sections are grouped in five main heading categories; "Content and learning outcomes", "Preparations before course start", "Examination and completion", "Further information" and "Contact".</p>
		<p>Expand or collapse the main heading category to see the headings in the category. Each heading is a link that takes you directly to the section with its content. Use it to navigate quickly in this course memo.</p>
		<p>An eye covered with slash indicates that the heading with its content will not be included in the published course memo.</p>`,
    },
    labelStartDate: 'Start date',
    mandatory: 'Mandatory',
    memoLanguage: {
      label: 'Language of memo',
      sv: 'Swedish',
      en: 'English',
    },
    season: {
      1: 'Spring ',
      2: 'Autumn ',
    },
    summaryIntroductionHelp: {
      titleMain: 'Introduction and instructions',
    },
  },
  alerts: {
    autoSaved: 'Draft saved',
    autoSavedTemporary: 'Changes save temporarily before publishing.',
    addedRoundId: 'Course offerings were changed',
    errorEmptyHeading: 'You need to name the header (look for error marks above)',
    errKoppsRounds:
      'Could not fetch all available administrative course instances because of error in Kopps. Try to refresh page',
    errNoChosen:
      'You must choose a draft or at least one administrative course instance to go further to the next step Edit course memo.',
    errNoChosenTemplate:
      'You must choose a course memo to copy (marked with red down below) to proceed to: Edit course memo.',
    errNoInPublishedChosen: 'You have to select a course memo to be able to proceed to Edit',
    errWhileSaving: 'Something went wrong. Contact IT Support.',
    errWhileDeleting: 'Cannot delete draft. Try again later and contact IT Support if the problem remains.',
    infoAboutFreshData: 'Information from course syllabus and contact information has automatically been updated.',
    infoRebuildDraft:
      'The contents of this course memo has been reset to the latest published version of this course memo.',
    infoStartAgain: 'There are unpublished changes in this course memo. You can',
    linkToRefreshData:
      'reset the contents in this draft to the contents of the latest published version of this course memo',
    removedAddedHeading: 'Added heading has been deleted',
    removedEmptyHeading: 'Added heading has been deleted because it did not have any heading and content',
    syllabusUpdated:
      'Information from course syllabus and contact information have been updated with the most recent information in the draft below.',
    warnFillInCommentAboutChanges:
      'You need to fill in the required fields (marked in red below) to proceed to: Edit course memo',
    warnReplacePm:
      'Observ: Any previously published course memo (see course offering below) will be replaced by the new course memo to be edited.',
  },
  breadCrumbLabels: {
    university: 'KTH',
    student: 'Student at KTH',
    directory: 'Course and programme directory',
    aboutCourse: 'About course',
    noLinksInPreview: 'Menu links doesn’t work in review mode',
  },
  coursePresentationLabels: {
    imageAltText: 'Inspiring image for course',
    imageTitleText: '',
  },
  sideMenuLabels: {
    directory: 'Course and programme directory',
    aboutCourse: 'About course',
    beforeChoosingCourse: 'Before course selection',
    courseMemo: 'Prepare and take course',
    finishCourse: 'Finish course',
    courseDevelopment: 'Course development',
    archive: 'Archive',
    noLinksInPreview: 'Menu links doesn’t work in review mode',
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Language Of Instruction',
    offeredByTitle: 'Offered By',
    roundsTitle: 'Course offering',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab',
  },
  courseMemoLinksLabels: {
    versionTitle: 'Course memo version',
    latest: 'Latest:',
    courseMemoArchiveLabel: 'Course memo archive',
    courseMemoPrint: 'Print or save',
    linkCourseMemoPrint: 'Print or save course memo',
    courseMemoModal: 'Link doesn’t work in review mode',
    btnCloseModal: 'Close',
    syllabus: 'Syllabus',
    syllabusInformation: 'fetched from',
    syllabusLinkStart: 'Syllabus',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab',
    inDevelopment: 'In development',
  },
  courseLinksLabels: {
    linkHeaderTitle: 'Student at KTH',
    beforeAndDuringACourse: 'Before and during a course',
    contactPersonsAndStudentCounselling: 'Contact persons and student counselling',
    rightsAndResponsibilities: 'Rights and responsibilities',
    linkOpensInNewTab: 'Link will open in new tab',
  },
  courseContactsLabels: {
    courseContactsTitle: 'Contacts',
    communicationWithTeachersTitle: 'Communication With Teachers',
    courseCoordinatorTitle: 'Course Coordinator',
    teacherTitle: 'Teacher',
    teacherAssistantsTitle: 'Teacher Assistants',
    examinerTitle: 'Examiner',
    otherContactsTitle: 'Other Contacts',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab',
  },
  courseHeaderLabels: {
    adminLinkLabel: 'Administer About course',
    label_edit_link_info: 'Link does not work in review mode',
    linkOpensInNewTab: 'Link will open in new tab',
  },
  courseImage: {
    Architecture: 'Picture_by_MainFieldOfStudy_01_Architecture.jpg',
    Biotechnology: 'Picture_by_MainFieldOfStudy_02_Biotechnology.jpg',
    'Computer Science and Engineering': 'Picture_by_MainFieldOfStudy_03_Computer_Science.jpg',
    'Electrical Engineering': 'Picture_by_MainFieldOfStudy_04_Electrical_Engineering.jpg',
    Physics: 'Picture_by_MainFieldOfStudy_05_Physics.jpg',
    'Industrial Management': 'Picture_by_MainFieldOfStudy_06_Industrial_Management.jpg',
    'Information Technology': 'Picture_by_MainFieldOfStudy_07_Information_Technology.jpg',
    'Information and Communication Technology': 'Picture_by_MainFieldOfStudy_08_Information_Communication.jpg',
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
    default: 'Picture_by_MainFieldOfStudy_26_Default_picture.jpg',
  },
}
