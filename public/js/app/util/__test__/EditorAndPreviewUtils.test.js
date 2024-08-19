import {
  isExtraHeadingVisibleInEditor,
  isExtraHeadingVisibleInPreview,
  isStandardHeadingVisibleInEditor,
  isStandardHeadingVisibleInPreview,
} from '../editorAndPreviewUtils'

const context = {
  courseContent: { type: 'mandatory', isRequired: true },
  literature: { type: 'mandatoryAndEditable', isRequired: true },
  learningActivities: { type: 'optionalEditable', isRequired: false },
  scheduleDetails: { type: 'optionalEditable', isRequired: false },
  prerequisites: { type: 'optional', isRequired: false },
  permanentDisabilitySubSection: { isRequired: false },
  additionalRegulations: { type: 'mandatoryForSome', isRequired: true },
  otherRequirementsForFinalGrade: { type: 'mandatoryForSome', isRequired: true },
  examinationSubSection: { isRequired: false },
  ethicalApproachSubSection: { isRequired: false },
}

const memoData = {
  courseContent: '<p>Some text</p>',
  literature: '',
  learningActivities: '',
  scheduleDetails: '<p>Some text</p>',
  prerequisites: '',
  additionalRegulations: '',
  otherRequirementsForFinalGrade: '<p>Some text</p>',
  examinationSubSection: '<p>Some text</p>',
  ethicalApproachSubSection: '',
  permanentDisabilitySubSection: '<p>Some text</p>',
  extraHeaders1: [
    { title: 'Extra Heading 1', htmlContent: '', visibleInMemo: true },
    { title: 'Extra Heading 2', htmlContent: '<p>Some text</p>', visibleInMemo: true },
    { title: 'Extra Heading 3', htmlContent: '<p>Some text</p>', visibleInMemo: false },
  ],
  extraHeaders2: [],
  visibleInMemo: {
    prerequisites: true,
    permanentDisabilitySubSection: false,
    additionalRegulations: true,
    examinationSubSection: true,
    ethicalApproachSubSection: true,
  },
}

describe('isStandardHeadingVisibleInEditor', () => {
  test.each(['courseContent', 'literature', 'additionalRegulations', 'otherRequirementsForFinalGrade'])(
    'if is required, return true',
    contentId => {
      const visibleInMemo = isStandardHeadingVisibleInEditor(contentId, context, memoData)
      expect(visibleInMemo).toBe(true)
    }
  )

  describe('if is not required', () => {
    test.each(['learningActivities', 'scheduleDetails'])('if visibility is not stored in db', contentId => {
      const visibleInMemo = isStandardHeadingVisibleInEditor(contentId, context, memoData)
      expect(visibleInMemo).toBe(false)
    })

    test.each(['permanentDisabilitySubSection'])('if visibility is stored as false in db, return false', contentId => {
      const visibleInMemo = isStandardHeadingVisibleInEditor(contentId, context, memoData)
      expect(visibleInMemo).toBe(false)
    })

    test.each(['prerequisites', 'examinationSubSection', 'ethicalApproachSubSection'])(
      'if visibility is stored as true in db, return true',
      contentId => {
        const visibleInMemo = isStandardHeadingVisibleInEditor(contentId, context, memoData)
        expect(visibleInMemo).toBe(true)
      }
    )
  })
})

describe('isExtraHeadingVisibleInEditor', () => {
  test.each([
    { extraHeaderTitle: 'extraHeaders1', index: 0 },
    { extraHeaderTitle: 'extraHeaders1', index: 1 },
  ])('if visibility is stored as true in db, return true', ({ extraHeaderTitle, index }) => {
    const visibleInMemo = isExtraHeadingVisibleInEditor(extraHeaderTitle, index, memoData)
    expect(visibleInMemo).toBe(true)
  })

  test.each([{ extraHeaderTitle: 'extraHeaders1', index: 2 }])(
    'if visibility is stored as false in db, return false',
    ({ extraHeaderTitle, index }) => {
      const visibleInMemo = isExtraHeadingVisibleInEditor(extraHeaderTitle, index, memoData)
      expect(visibleInMemo).toBe(false)
    }
  )
})

describe('isStandardHeadingVisibleInPreview', () => {
  test.each(['courseContent', 'literature'])('if type is mandatory or mandatoryAndEditable, return true', contentId => {
    const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)
    expect(visibleInMemo).toBe(true)
  })

  describe('if type is not mandatory or mandatoryAndEditable', () => {
    test.each(['learningActivities', 'prerequisites', 'ethicalApproachSubSection', 'additionalRegulations'])(
      'if html does not have content, return false',
      contentId => {
        const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)
        expect(visibleInMemo).toBe(false)
      }
    )

    test.each(['otherRequirementsForFinalGrade'])(
      'if html has content and type is mandatoryForSome, return true',
      contentId => {
        const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)
        expect(visibleInMemo).toBe(true)
      }
    )

    test.each(['examinationSubSection'])(
      'if html has content and visibility is stored as true in db, return true',
      contentId => {
        const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)
        expect(visibleInMemo).toBe(true)
      }
    )

    test.each(['scheduleDetails'])(
      'if html has content, visibility is not stored or is stored as false in db and type is not mandatoryForSome, return false',
      contentId => {
        const visibleInMemo = isStandardHeadingVisibleInPreview(contentId, context, memoData)
        expect(visibleInMemo).toBe(false)
      }
    )
  })
})

describe('isExtraHeadingVisibleInPreview', () => {
  test.each([{ extraHeaderTitle: 'extraHeaders1', index: 0 }])(
    'if html does not have content and visibility is stored as true in db, return false',
    ({ extraHeaderTitle, index }) => {
      const visibleInMemo = isExtraHeadingVisibleInPreview(extraHeaderTitle, index, memoData)
      expect(visibleInMemo).toBe(false)
    }
  )

  test.each([{ extraHeaderTitle: 'extraHeaders1', index: 1 }])(
    'if html has content and visibility is stored as true in db, return true',
    ({ extraHeaderTitle, index }) => {
      const visibleInMemo = isExtraHeadingVisibleInPreview(extraHeaderTitle, index, memoData)
      expect(visibleInMemo).toBe(true)
    }
  )

  test.each([{ extraHeaderTitle: 'extraHeaders1', index: 2 }])(
    'if html has content and visibility is stored as false in db, return false',
    ({ extraHeaderTitle, index }) => {
      const visibleInMemo = isExtraHeadingVisibleInPreview(extraHeaderTitle, index, memoData)
      expect(visibleInMemo).toBe(false)
    }
  )
})
