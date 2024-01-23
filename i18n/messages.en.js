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
     * Authentication message
     */

    contact_support: 'Contact',
    for_questions: 'if you have any questions.',
    friendly_message_have_not_rights: "You don't have permission to use About course's administration tool",
    message_have_not_rights: `You don't have permission to use About course's administration tool. Permission is automatically given to those who are added as an examiner, course coordinator or teacher for the course in Kopps.`,
    message_have_not_rights_link_pre_text: 'It is possible',
    message_have_not_rights_link_href:
      'https://intra.kth.se/en/utbildning/systemstod/om-kursen/behorighet-for-om-kursen-1.1051642',
    message_have_not_rights_link_text: 'to apply for administrator access to the About course administration tool',
    message_have_not_rights_link_after_text:
      "The application must be made by the school's Educational Administration Manager.",

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
    main_site_name: 'Administer About course ',
    site_name: 'Administer About course',
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
    fetched: 'Fetched ', // IF NOT EDITABLE
    '(c)': 'from Kopps',
    '(r)': 'from course round information',
    '(s)': 'from course syllabus',
    errorEmptyHeading: 'You need to name the header',
    mandatory: 'Always included',
    mandatoryAndEditable: 'Always included',
    mandatoryForSome: 'Included when there is content in the course syllabus',
    includeInMemo: {
      section: 'Include in course memo',
      subSection: 'Include additional section',
    }, // RUBRIK/ADDITION
    noInfoYet: {
      section: 'No information is inserted. Insert information or remove section from course memo.',
      subSection: 'No information is inserted. Insert information or remove section from course memo.',
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
    insertedSubSection: 'The section below is not retrivied from the course syllabus:',
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
    teacher: 'Teachers',
    teacherAssistants: 'Teacher assistants',
  },
  memoInfoByUserLang: {
    additionalRegulations: {
      body: `<p><b>Additional regulations</b> describe regulations in the course syllabus that does not comply with any of the other sections in the course syllabus.</p>
      <p><b>The information helps the student</b> to plan and prepare for their studies.</p>
      <p><b>Contents can be edited</b> in Kopps. Changes in "Additional regulations" is restricted by certain regulations since the information is part of the legally binding course syllabus. Read more about changing the contents of the course syllabus on the page <a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a> (only in Swedish, opens in new tab).</p>
      <p><b>If there is no content</b> the heading will not be visible in the published course memo.</p>`,
    },
    commentAboutMadeChanges: {
      body: `<p><b>Made changes</b> can be seen as a change log containing the changes made to a published course memo. The information is not public. Made changes shall include a short description of the changed sections and the reason of the changes. The system itself saves date and time of each published change to this course memo.</p>`,
      help: `<p></p>
      <p></p>`,
    },
    communicationDuringCourse: {
      body: `<p><b>Communication during course</b> describes how the student should communicate with the teachers and other personnel before and during the course offering. Communication during course also describes whom to contact regarding the most common questions and issues.</p>
		<p><b>The information helps the student</b> to understand how to communicate during this course offering. Information in this section makes communication more efficient and reduces the number of unnecessary questions.</p>
		<p><b>Edit the contents</b> by clicking on the button "Edit". Enter information and check "Include", to include the content in your course memo. Expand the "Show guidance" panel (after you have clicked the edit button) for further guidance.</p>`,
      help: `<p>Describe how to communicate before and during this course offering in the section "Communication during course". For example, you can refer to the teachers regarding questions before start of the course and to Canvas for dialogue during the course. If you want different types of questions to be handled differently, describe the different ways to communicate in short.</p>
		<p>Don´t write contact information in this section. Instead you refer to the sections "Course coordinator", "Teacher", "Teacher assistants", "Examiner" and "Other contacts".</p>
		<p>Uncheck "Include heading" if there is no reason to inform about communication during course.</p>`,
    },
    courseContent: {
      body: `<p><b>Course contents</b> describes the content and the general skills covered in the course.</p>
      <p><b>This information helps the student</b> which concepts, topics, skills, etc., they need to familiarize themselves with before and during the course.</p>
      <p><b>The content is retrieved from the course syllabus in Kopps and cannot be edited here.</b> Read more about guidelines for changing content in the course syllabus on the page
      &quot;<a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a>&quot; (opens in new tab, only in Swedish).</p>`,
    },
    courseCoordinator: {
      body: `<p><b>Course coordinator</b> holds the contact details of the course coordinator on this course offering.</p>
      <p><b>The information helps the student</b> with contact information for course coordinators during the course offering.</p>
	  <p><b>Edit the contents</b> in Kopps. Course coordinators are administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    ethicalApproach: {
      body: `<p><b>Ethical approach</b> describes KTH's ethical values.</p>
      <p><b>The information helps the student</b> to know what ethical values, rights and obligations to relate to during the studies. Clearly expressed ethical values increases the student´s trust for KTH.</p>
      <p><b>Edit the contents</b> by including an additional section. The first text under the heading is fixed and is a part of the template for the course memo. Click on the button "Edit". Enter information and check "Include additional section", to include the content in your course memo. Expand the "Show guidance" panel (after you have clicked the edit button) for further guidance.</p>`,
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
      body: `<p><b>Equipment</b> describes what equipment is not provided by KTH and is needed to follow the course offering.</p>
      <p><b>This information helps the student</b> acquire the right equipment before the start of the course offering.</p>
      <p><b>The content is retrieved from Kopps</b> if there is information about equipment already entered. You can choose to retain that information in your course memo or add new information.</p>`,
      help: `<p>Under this section, you describe the equipment that students need to complete the course, if it is not provided by KTH. Writing tools and literature are not considered equipment.</p>`,
    },
    examiner: {
      body: `<p><b>Examiner</b> holds the contact details of the examiner for this course.</p>
      <p><b>The information helps the student</b> with contact information for examiners during the course offering.</p>
	  <p><b>Edit the contents</b> in Kopps. Examiners are administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    examination: {
      body: `<p><b>Examination</b> describes the examination of the course and the examination details of each course module.</p>
      <p><b>This information helps the student</b> in planning the course and preparing for each course module. </p>
      <p><b>The content is retrieved from the course syllabus in Kopps</b> (the fixed text at the top), but it can also be supplemented by adding an additional paragraph about the examination.
      Read more about guidelines for changing content in the course syllabus on the page &quot;<a href=" https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a>&quot; (opens in new tab, only in Swedish).</p>`,
    },
    examinationSubSection: {
      body: 'It is important for students because they can plan their studies....',
      help: `<p>There are two sections under the "Examination" heading. First there is an examination overview that is fetched from the course syllabus. This text will be published in this course memo.</p>
      <p>Describe the details of the examination in the second section. If this is a new course memo, that is not a new version or copied from another course memo, the system will provide you with preformatted subheadings of each module. 
      Consider to describe the following information beneath each subheading:</p>
      <ul>
      <li>how the examination is performed</li>
      <li>the parts of the examination</li>
      <li>any deadlines</li>
      <li>allowed aids during the examination</li>
      <li>the terms for collaboration and group projects</li>
      <li>...and any other important information regarding the details of the examination.</li>

      </ul>
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
      body: `<p><b>Grading criteria/assessment criteria</b> specify the requirements that students must meet for different grades and should be formulated based on the course objectives in the course syllabus.</p>
        <p><b>This information helps students</b> understand how the grading criteria/assessment criteria relate to the learning objectives and, consequently, what they need to do and understand to achieve each grade in the course.</p>`,
      help: `<p>Under this section, you describe the Grading criteria/assessment criteria for this course offering. Grading criteria/assessment criteria shall be available for all courses and course modules with the seven-grade or three-grade grading scale. For course modules graded according to the two-degree grading system, no grading criteria need to be developed as the goals themselves constitute grading criteria.</p>
      <p>Read more and find examples of <a href="https://intra.kth.se/en/utbildning/utveckling-och-hogskolepedagogik/stodmaterial/malrelaterade-betygskriterier" target="_blank">Grading criteria</a> (opens in new tab).</p>`,
    },
    gradingScale: {
      body: `<p><b>Grading scale</b> describes the grading scale for the final grades of the entire course.</p>
        <p><b>This information helps the student</b> understand what grade they can expect upon completing the course.</p>
        <p><b>Content is retrieved from the course syllabus in Kopps and cannot be edited here.</b> Read more about guidelines for changing content in the course syllabus on the page &quot;<a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a>&quot; (opens in new tab, only in Swedish).
        </p>`,
    },
    infoForReregisteredStudents: {
      body: `<p><b>Changes of the course before this course offering</b> describe what major changes have been implemented before this course offering.</p>
      <p><b>The information helps the student</b> to understand what improvements have been made before this course offering. The information can also alert re-registered students to changes from previous course offerings.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information and check "Include", to include the content in your course memo. Expand the "Show guidance" panel (after you have clicked the edit button) for further guidance.</p>`,
      help: `<p>Describe the changes that have been made to the course before this course offering in the section "Changes of the course before this course offering". 
      Some relevant conclusions from previous course evaluations and course analysis could also be important to point out to help the student to plan and prepare for the course. 
      The course memo as a document is one of several mediums to inform the students about the results from course evaluations and course analysis and the decisions that followed.</p>
      <p>Uncheck "Include" if information about "Changes of the course before this course offering" is irrelevant for this course.</p>`,
    },
    learningActivities: {
      body: `<p><b>Learning activities</b> describe the types of activities that have been planned for the course. Learning activities define what, for example, a seminar, a lesson, or a laboratory session entails in this specific course offering.</p>
      <p><b>This information helps the student</b> understand and plan for the activities during the course.</p>`,
      help: `<p>Under this section, you describe the types of activities planned during the course. Provide each type with an intuitive and preferably widely accepted term that you will consistently use in this course memo.</p> 
      <p>Briefly describe what each type of activity means in this specific course offering and what is beneficial for the student to know. You can also describe the extent of the activities.</p>`,
    },
    learningOutcomes: {
      body: `<p><b>Intended learning outcomes</b> clarify the knowledge, skills, evaluative abilities, and approaches that the student should demonstrate after completing the course.</p>
      <p><b>This information helps the student</b> understand what they need to achieve to receive a passing grade.</p>      
      <p><b>The content is retrieved from the course syllabus in Kopps and cannot be edited here.</b> Read more about guidelines for changing content in the course syllabus on the page &quot;<a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a>&quot; (opens in new tab, only in Swedish).</p>`,
    },
    literature: {
      body: `<p><b>Literature</b> describes the literature used in the course offering.</p>
      <p><b>This information helps the student</b> acquire the correct literature before the start of the course. For students with disabilities, it is especially important to know in good time which literature will apply in order to get it as talking books.</p>
      <p><b>Content is retrieved from Kopps</b> if there is information about literature already entered. You can choose to retain that information in your course memo or add new information. The heading is always included in your course memo.</p>`,
      help: `<p>Under this section, you describe the literature used in this course offering. This heading is mandatory in the course memo.
      List the literature with author, publication year, title, and publisher. Also, provide references to locations where the literature can be downloaded if available in digital form.</p>
      <p>If literature is not relevant for this course offering, it's helpful to state this so that students do not need to inquire.</p>`,
    },
    otherContacts: {
      body: `<p><b>Other contacts</b> describe the contact details of personnel and functions, other than the contacts mentioned above, the students may have to contact before or during this course offering. Course administrators, lab supervisors, and project supervisors are examples of Other contacts.</p>
			<p><b>The information helps the student</b> with contact information for other functions during the course offering.</p>
			<p><b>Edit the contents</b> by clicking on the button "Edit". Enter information and check "Include", to include the content in your course memo. Expand the "Show guidance" panel (after you have clicked the edit button) for further guidance.</p>`,
      help: `<p>Describe the contact details to personnel and functions other than the contacts mentioned above. Enter name, mail address and phone number. Describe in short the questions and issues each contact handles.</p>
			<p>Contacts already mentioned in the "Course coordinator", "Teacher", "Teacher assistants" and "Examiner" sections should not be repeated in this section.</p>
			<p>Uncheck "Include heading" if there is no reason to inform about other contacts.</p>`,
    },
    otherRequirementsForFinalGrade: {
      body: `<p><b>Other requirements for final grade</b> describe additional criteria for the overall course grade, beyond what is specified under the "Examination" heading, such as attendance requirements.</p>
      <p><b>This information helps the student</b> in planning and preparing for the overall execution of the course offering.</p>
      <p><b>Content is retrieved from the course syllabus in Kopps and cannot be edited here.</b> Read more about guidelines for changing content in the course syllabus on the page &quot;<a href="https://intra.kth.se/utbildning/utbi/planera-utbildning" target="_blank">Planera utbildningsutbud</a>&quot; (opens in new tab, only in Swedish). </p>
      <p><b>If there is no content,</b> the heading will not appear in your course memo.</p>`,
    },
    permanentDisability: {
      body: `<p><b>Support for students with disabilities</b> outlines the rights and opportunities available for students with disabilities. The information describes the support they can expect during the course offering and the procedures they should follow.</p>
      <p><b>This information helps students</b> with disabilities in understanding how they can receive the appropriate support to complete the course offering.</p>`,
      help: `<p>Under the heading, there are two sections. At the top, there is a fixed text that is not editable. This fixed text contains a web link to KTH's official page with general information about support for students with disabilities.
      Following the fixed text is a section where you describe the support for students with disabilities that is specifically relevant to this course offering. You can inform about compensatory support during examinations or other support in the study situation. 
      Read more about <a href="https://intra.kth.se/en/utbildning/utbi/examination/stod-funka/hantera-stod-till-studenter-med-funktionsnedsattning-1.691449" target="_blank">managing support for students with disabilities</a> (opens in a new tab).</p>`,
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
      body: `<p><b>Opportunity to raise an approved grade via renewed examination</b> describes if it is possible to raise an approved grade on this course and the terms for raising the grade.</p>
      <p><b>This information helps the student</b> to understand if it is possible to raise an approved grade via renewed examination in this course offering.</p>
      <p><b>Content is retrieved from Kopps</b> if there is information about Opportunity to raise an approved grade via renewed examination entered. You can choose to retain that information in your course memo or add new information.</p>`,
      help: `<p>Under this section, you describe if it is possible to raise an approved grade via renewed examination on this course offering and the terms for that. Also describe how the student can apply for a renewed examination.
      If it is not possible to raise an approved grade via renewed examination on this course offering it may be beneficial to indicate this.</p>`,
    },
    possibilityToCompletion: {
      body: `<p><b>Opportunity to complete the requirements via supplementary examination</b> describes whether there is a chance for supplementary examination in this course offering and if completion can be done only up to a grade E or to a higher grade.</p>
      <p><b>This information helps the student</b> to understand if it is possible to complete the requirements via supplementary examination and, if so, the conditions for completion in this course offering.</p>
      <p><b>Content is retrieved from Kopps</b> if there is information about Opportunity to complete the requirements via supplementary examination entered. You can choose to retain that information in your course memo or add new information.</p>`,
      help: `<p>Under this section, you describe if it is possible to complete the requirements via supplementary examination on this course offering and, if so, the applicable conditions. Also describe if it is possible to complete the requirements via supplementary examination on each module.</p>
      <p>All modules in a course with differentiated grading scale must offer an opportunity to complete the requirements via supplementary examination from Fx to Pass.  Opportunity to complete the requirements via supplementary examination can be offered by the examiner for modules with grading scale P/F.</p>
      <p>It is often better to describe opportunity to complete the </p>`,
    },
    possibilityToCompensate: {
      body: `<p><b>Alternatives to missed activities or tasks</b> describes whether there is an opportunity for replacement assignments in the course offering, and if so, what applies if the student misses mandatory elements.</p>
      <p><b>This information helps the student</b> in planning the implementation of the course while simultaneously studying another course. Clearly described information about alternatives to missed activities or tasks also increases legal certainty.</p>`,
      help: `<p>Under this section, you describe whether there is alternatives to missed activities or tasks in the course offering. 
      If possible, you describe the procedures if a student misses a mandatory element. This may apply in cases where the student misses an activity with mandatory attendance or is absent during a study visit.</p>
      <p>Note that if a form of examination other than the regular one is used in a replacement assignment, it must be stated in the course syllabus under “Examination comment”.</p>`,
    },
    preparations: {
      body: `<p><b>Specific preparations</b> describes the most important preparations for the students before start of this course offering.</p>
      <p><b>The information helps the student</b> to plan for and prepare for the course.</p>
      <p><b>Edit the contents</b> by clicking on the button "Edit". Enter information and check "Include", to include the content in your course memo. Expand the "Show guidance" panel (after you have clicked the edit button) for further guidance.</p>`,
      help: `<p>Describe the most important preparations for the students in the "Specific preparations" section. 
      Write things that are important to know or to do before the start of the course. 
      That could be ordering the course literature, rehearse specific theories from "Specific prerequisites", rehears parts from "Recommended prerequisites", install software etc.</p>
      <p>Preparations in general should be described in the "Learning activities" section if it is related to the different types of activity types or described in the "Detailed plan" section if it is related to specific reading guidelines prior to each learning activity.</p>
      <p>Uncheck "Include heading" if there is no reason to inform about specific preparations on this course.</p>`,
    },
    prerequisites: {
      body: `<p><b>Recommended prerequisites</b> describe what the teacher expects the student to have mastered when the course begins.</p>
      <p><b>This information helps the student</b> understand which knowledge is crucial to be updated on when the course starts. Clearly defined information makes it easier for the student to review the correct theories and models before the course begins.</p>
      <p><b>Content is retrieved from Kopps</b> and can only be edited in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized personnel</a> (both links open in a new tab). You can choose not to include the heading in your course memo.</p>`,
      help: `<p>Under this section, you describe what is particularly important for the student to prepare for. You can encourage the student to review knowledge from the "Specific prerequisites" section in the course syllabus, revisit crucial aspects from the "Recommended prerequisites," remind them to order specific literature on time, or install software.</p>`,
    },
    reportingResults: {
      body: `<p><b>Reporting of exam results</b> describes when and how the registration of students' results and grades takes place, as well as where the student can access this information.</p>
      <p><b>This information helps the student</b> so that they know when and how they can access results and grades. This allows the student to account for any re-examinations in their planning. It is also important for the student to feel secure in knowing that they will be eligible for continued financial support for their studies.</p>`,
      help: `<p>Under this section, you describe how reporting of exam results is conducted in the course offering. The information is particularly important if reporting of exam results for this course offering differs from the regular procedures, for example, if the course offering spans multiple semesters or if results for the entire course may take longer than usual. 
      Typically, the student can expect to receive results within three weeks or fifteen working days after the examination.</p>`,
    },
    scheduleDetails: {
      body: `<p><b>Detailed plan</b> is an overview of the course's planned learning activities and examinations. It includes information about the activities and what the student needs to prepare for each activity.</p>
      <p><b>This information helps the student</b> plan their studies and carry out the course effectively.</p>`,
      help: `<p>Under this section, you describe the learning activities and examinations planned for the course. Outline the sequence of activities, their content, and the recommended preparations for each activity.</p>
      <p>Preparations may include chapters and other references to course literature or websites, but it can also involve installing software or other practical preparations.</p>`,
    },
    software: {
      body: `<p><b>Software</b> describes which software and the version of the software that should be used during the course.</p>
      <p><b>This information helps the student</b> to access the right software before the start of the course offering.</p>`,
      help: `<p>Under this section, you describe if any specific software, including version, is used. Also, provide references or web links to where the software can be downloaded, and if instructions and installation guidelines are available elsewhere, include that information.
      If there are no external references, provide instructions and installation guidelines directly under this heading.</p>`,
    },
    teacher: {
      body: `<p><b>Teachers</b> hold the contact details of the teachers during this course offering.</p>
      <p><b>The information helps the student</b> with contact information for teachers during the course offering.</p>
	  <p><b>Edit the contents</b> in Kopps. Teachers are administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs.</p>`,
    },
    teacherAssistants: {
      body: `<p><b>Teacher assistants</b> holds the contact details to the teacher assistants on this course offering.</p>
      <p><b>The information helps the student</b> with contact information for teacher assistants during the course offering.</p>
	  <p><b>Edit the contents</b> in Kopps. Teacher assistants is administred in <a href="https://app.kth.se/kopps/admin/courses" target="_blank">Kopps</a> by <a href="https://app.kth.se/kopps/admin/userlist" target="_blank">authorized persons in Kopps</a>. The links open in new tabs. You choose whether the contact information should be included in your course memo or not. If you want to include the information, click on "Include".</p>`,
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
      title: 'Choose course memo',
      intro: `Start by selecting the semester and the course memo you want to change (step 1 of 3). In the next step (2 of 3) you will be able to edit the course memo. In the last step (3 of 3) you can review the course memo and then publish it as a new version on the page: About course/Prepare and take course.`,
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
    asterisk: 'Headings denoted with an asterisk ( * ) is retrieved from the course syllabus version ',
  },
  pageTitles: {
    new: 'Create and publish course memo',
    published: 'Edit published course memo',
  },
  actionModals: {
    changeLadokRoundApplicationCodes: {
      header: 'Change course instances',
      body: '',
      btnClose: 'Cancel',
      btnConfirm: 'Save',
    },
    infoCancel: {
      header: 'Exit with draft',
      body: `The draft is saved..
        <br/>
        <br/>
        You will find the draft in the previous step (step 1) under the heading Choose course memo. There you can choose to continue editing the draft or to delete it.
        <br/>
        <br/>
        Do you want to continue to exit?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, exit',
    },
    infoFinish: {
      header: 'To be aware of before exit!',
      body: `Drafts are saved only on the page "Edit course memo" (step 2).
        <br/>
        <br/>
        Saved drafts are displayed in the "Choose course memo" section on this page. You can choose to delete a draft or to continue editing the selected draft.
        <br/>
        <br/>
        Do you want to exit?`,
      btnClose: 'No, go back',
      btnConfirm: 'Yes, exit',
    },
    infoSaveAndFinish: {
      header: 'Exit with draft',
      body: `The draft is saved.
        <br/>
        <br/>
        You will find the draft in the previous step (step 1) under the heading Choose course memo. There you can choose to continue editing the draft or to delete it.
        <br/>
        <br/>
        Do you want to continue to exit?`,
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
    infoRemoveCourseRound: {
      header: 'To be aware of before deleting this course round!',
      body: `Deleting the course round cannot be undone. Thecours round will be lost.
      <br/><br/>
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
      header: 'Choose semester',
      body: '<p>Start by selecting the semester and the course memo you want to change.</p>',
    },
    chooseRound: {
      header: 'Choose course offering',
      body: `<p>Choose all the administrative course instances that is included in the course offering. 
      Students are admitted to an administrative course instance. 
      Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. 
      A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. 
      Several administrative course instances are grouped to one course offering.</p>`,
      addRounds: {
        label: 'Select a course instance to include or remove it:',
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
    chooseMemo: {
      header: 'Choose course memo',
      body: `<p>Here you can see the course memos that can be changed. A course memo can be changed up to one year after the course has ended</p><p>Please note that a course memo should only be changed in exceptional cases in the event of obvious inaccuracies or changes in the course structure.</p>`,
    },
    createFrom: {
      labelBasedOn: 'Start from',
      labelAllPrevMemos: 'Choose course memo to copy:',
      infoTextForMemos: 'Listed course memos are published for previous course offerings',
      basedOnStandard: 'Empty KTH course memo template',
      basedOnAnotherMemo: 'Copy of a course memo from a previous course offering',
    },
    publishedHasDraft: ' - Draft',
    errKoppsRounds:
      'Could not fetch all available administrative course instances because of error in Kopps. Try to refresh page',
    noRoundsToAdd:
      'All administrative course instances this semester has a published course memo or a draft of a course memo. Therefore, there is no administrative course instance to add to this course memo. View saved drafts on this page or published course memos on the page "About course memo" for this course.',
    noCourseRoundsAvailable:
      'All administrative course instances the chosen semester are already included in a course offering that has a published course memo or draft. See drafts or published course memos on the page Prepare and take course/Course memo.',
    noSavedDrafts: 'There are no saved drafts.',
    noSemesterAvailable:
      'There are no semesters to choose since there are no current or future course offerings for this course. Check Kopps if you expect course offerings to create course memos for.',
    noPrevPublishedAvailable: 'There are no published course memos for previous course offerings.',
    noPublishedMemos: 'There are no published course memos for this, the previous or the upcoming semester.',
  },
  changePublishedInfo: {
    choosePublishedMemo: 'Choose course memo',
  },
  buttons: {
    /** ************ BUTTONS ****************** */
    btnAddExtra: 'Add heading to ',
    btnClose: 'Close',
    btnRemove: 'Delete draft',
    btnRemoveUnpublishedChanges: 'Delete draft',
    btnRemoveHeading: 'Remove added heading',
    btnFinish: 'Cancel',
    btnSaveAndFinish: 'Exit with draft',
    saveAndCloseEditor: 'Save and exit',
    closeEditor: 'Close edit mode',
    preview: 'Preview',
    previewPdf: 'Preview PDF',
    edit: 'Edit',
    cancel: 'Exit with draft',
    save: 'Save draft',
    saveDraft: 'Save draft',
    publish: 'Publish',
    goToRounds: 'Choose course offering',
    goToMemos: 'Choose course memo',
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
    errWhilePublishing: 'Cannot publish draft. Try again later and contact IT Support if the problem remains.',
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
    aboutCourseMemos: 'Course memo',
  },
  courseFactsLabels: {
    versionTitle: 'Version',
    languageOfInstructionTitle: 'Language Of Instruction',
    offeredByTitle: 'Offered By',
    roundsTitle: 'Course offering',
    mandatoryFieldMissing: 'Missing mandatory information',
    linkOpensInNewTab: 'Link will open in new tab',
    startdate: 'Start date',
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
    linkOpensInNewTab: 'Link will open in new tab',
    linkHeaderTitle: 'Related information',
    administrateYouStudy: 'Administrate your studies',
    courseAndExamination: 'Course and examination',
    rightsAndResponsibilities: 'Rights and responsibilities',
  },
  courseContactsLabels: {
    courseContactsTitle: 'Contacts',
    communicationWithTeachersTitle: 'Communication during course',
    courseCoordinatorTitle: 'Course Coordinator',
    teacherTitle: 'Teachers',
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
