const { getContractEducationStructure, standardSections } = require('../sectionAndHeaderUtils')

describe('parse a changed copy of sections for a contract education without changing default sections', () => {
  test('compare a copy of sections content (ids: extra, prep) without changing the default sections content', () => {
    const changedSections = getContractEducationStructure()
    const [, changedPrepSection, , changedExtraSection] = changedSections
    const [, defaultPrepSection, , defaultExtraSection] = standardSections

    expect(changedPrepSection).not.toMatchObject(defaultPrepSection)
    expect(changedExtraSection).not.toMatchObject(defaultExtraSection)
  })
  test('compare a copy of sections with the default sections (default structure must be unchanged)', () => {
    const changedSections = getContractEducationStructure()
    expect(changedSections).not.toMatchObject(standardSections)
  })

  test('compare snapshots of a copy of sections content (ids: extra, prep) without changing the default sections content', () => {
    const changedSections = getContractEducationStructure()
    const [, changedPrepSection, , changedExtraSection] = changedSections
    const [, defaultPrepSection, , defaultExtraSection] = standardSections

    expect(changedPrepSection.content).toMatchInlineSnapshot(`
      [
        "prerequisites",
        "preparations",
        "literature",
        "equipment",
        "software",
      ]
    `)
    expect(changedExtraSection.content).toMatchInlineSnapshot(`
      [
        "infoForReregisteredStudents",
      ]
    `)

    expect(defaultExtraSection.content).toMatchInlineSnapshot(`
      [
        "additionalRegulations",
        "infoForReregisteredStudents",
      ]
    `)
    expect(defaultPrepSection.content).toMatchInlineSnapshot(`
      [
        "prerequisites",
        "preparations",
        "literature",
        "equipment",
        "software",
        "permanentDisability",
        "permanentDisabilitySubSection",
      ]
    `)

    expect(changedSections).toMatchInlineSnapshot(`
      [
        {
          "content": [
            "courseContent",
            "learningOutcomes",
            "learningActivities",
            "scheduleDetails",
          ],
          "extraHeaderTitle": "extraHeaders1",
          "id": "contentAndOutcomes",
          "title": "Innehåll och lärandemål",
        },
        {
          "content": [
            "prerequisites",
            "preparations",
            "literature",
            "equipment",
            "software",
          ],
          "extraHeaderTitle": "extraHeaders2",
          "id": "prep",
          "title": "Förberedelser inför kursstart",
        },
        {
          "content": [
            "gradingScale",
            "examination",
            "examinationSubSection",
            "otherRequirementsForFinalGrade",
            "gradingCriteria",
            "possibilityToCompletion",
            "possibilityToAddition",
            "possibilityToCompensate",
            "reportingResults",
            "ethicalApproach",
            "ethicalApproachSubSection",
          ],
          "extraHeaderTitle": "extraHeaders3",
          "id": "reqToFinal",
          "title": "Examination",
        },
        {
          "content": [
            "infoForReregisteredStudents",
          ],
          "extraHeaderTitle": "extraHeaders4",
          "id": "extra",
          "title": "Ytterligare Information",
        },
        {
          "content": [
            "communicationDuringCourse",
            "courseCoordinator",
            "teacher",
            "examiner",
            "otherContacts",
          ],
          "extraHeaderTitle": null,
          "id": "contacts",
          "title": "Kontakter",
        },
      ]
    `)
    expect(standardSections).toMatchInlineSnapshot(`
      [
        {
          "content": [
            "courseContent",
            "learningOutcomes",
            "learningActivities",
            "scheduleDetails",
          ],
          "extraHeaderTitle": "extraHeaders1",
          "id": "contentAndOutcomes",
          "title": "Innehåll och lärandemål",
        },
        {
          "content": [
            "prerequisites",
            "preparations",
            "literature",
            "equipment",
            "software",
            "permanentDisability",
            "permanentDisabilitySubSection",
          ],
          "extraHeaderTitle": "extraHeaders2",
          "id": "prep",
          "title": "Förberedelser inför kursstart",
        },
        {
          "content": [
            "gradingScale",
            "examination",
            "examinationSubSection",
            "otherRequirementsForFinalGrade",
            "gradingCriteria",
            "possibilityToCompletion",
            "possibilityToAddition",
            "possibilityToCompensate",
            "reportingResults",
            "ethicalApproach",
            "ethicalApproachSubSection",
          ],
          "extraHeaderTitle": "extraHeaders3",
          "id": "reqToFinal",
          "title": "Examination",
        },
        {
          "content": [
            "additionalRegulations",
            "infoForReregisteredStudents",
          ],
          "extraHeaderTitle": "extraHeaders4",
          "id": "extra",
          "title": "Ytterligare Information",
        },
        {
          "content": [
            "communicationDuringCourse",
            "courseCoordinator",
            "teacher",
            "examiner",
            "otherContacts",
          ],
          "extraHeaderTitle": null,
          "id": "contacts",
          "title": "Kontakter",
        },
      ]
    `)
  })
})
