import generatedExtraHeaders from './generateExtraHeaders'
import generatedStandardVisibility from './generateStandardVisibility'
import generatedStandardMemoData from './generateStandardMemoData'
import mockMiniMemos from '../miniMemos'

const { draftsOfPublishedMemos, draftsWithNoActivePublishedVer, publishedWithNoActiveDraft } = mockMiniMemos

const memoTypes = {
  // PUBLISHED_WITHOUT_DRAFT: {
  //   en: {
  //     filledInAndVisible: {
  //       _id: publishedWithNoActiveDraft[0].memoId,
  //       courseTitle: 'EF1111 Project in Plasma Physics 9.0 credits',
  //       courseCode: 'EF1111',
  //       semester: 20191,
  //       ...generatedStandardMemoData(true),
  //       ...generatedExtraHeaders(true),
  //       ...generatedStandardVisibility(false, true),
  //       ...publishedWithNoActiveDraft[0],
  //       syllabusValid: {
  //         validFromTerm: 20191,
  //         validUntilTerm: 20201
  //       }
  //     }
  //   },
  //   sv: { filledInAndVisible: {} }
  // },
  DRAFT_OF_PUBLISHED: {
    en: {
      // emptyAndVisible: {
      //   _id: draftsOfPublishedMemos[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(),
      //   ...generatedExtraHeaders(),
      //   ...generatedStandardVisibility(false, true),
      //   ...draftsOfPublishedMemos[0]
      // },
      filledInAndVisible: {
        _id: draftsOfPublishedMemos[0].memoId,
        courseCode: 'EF1111',
        courseTitle: 'EF1111 Project in Plasma Physics 9.0 credits',
        semester: 20191,
        ...generatedStandardMemoData(true),
        ...generatedExtraHeaders(true),
        ...generatedStandardVisibility(false, true),
        ...draftsOfPublishedMemos[0],
        syllabusValid: {
          validFromTerm: 20191,
          validUntilTerm: 20201,
        },
        version: 2,
        lastPublishedVersionPublishDate: 'Wed Jul 01 2019 13:37:34 GMT+0000 (Coordinated Universal Time)',
      },
      filledInAndInvisible: {
        _id: draftsOfPublishedMemos[0].memoId,
        courseCode: 'EF1111',
        courseTitle: 'EF1111 Project in Plasma Physics 9.0 credits',
        ...generatedStandardMemoData(true),
        ...generatedExtraHeaders(true),
        ...generatedStandardVisibility(false, false),
        ...draftsOfPublishedMemos[0],
        syllabusValid: {
          validFromTerm: 20191,
          validUntilTerm: 20201,
        },
        version: 2,
        lastPublishedVersionPublishDate: 'Wed Jul 01 2019 13:37:34 GMT+0000 (Coordinated Universal Time)',
      },
    },
    sv: { filledInAndVisible: {} },
  },
  DRAFT_NEW_MEMO: {
    en: {
      freshEmpty: {
        _id: draftsWithNoActivePublishedVer[0].memoId,
        courseCode: 'EF1111',
        courseTitle: 'EF1111 Project in Plasma Physics 9.0 credits',
        semester: 20191,
        ...generatedStandardMemoData(),
        ...generatedExtraHeaders(),
        ...generatedStandardVisibility(true),
        ...draftsWithNoActivePublishedVer[0],
        syllabusValid: {
          validFromTerm: 20191,
          validUntilTerm: 20201,
        },
      },
      // emptyAndVisible: {
      //   _id: draftsWithNoActivePublishedVer[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(),
      //   ...generatedExtraHeaders(),
      //   ...generatedStandardVisibility(false, true),
      //   ...draftsWithNoActivePublishedVer[0]
      // },
      // emptyAndInvisible: {
      //   _id: draftsWithNoActivePublishedVer[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(),
      //   ...generatedExtraHeaders(),
      //   ...generatedStandardVisibility(false, false),
      //   ...draftsWithNoActivePublishedVer[0]
      // },
      filledInAndVisible: {
        _id: draftsWithNoActivePublishedVer[0].memoId,
        courseCode: 'EF1111',
        courseTitle: 'EF1111 Project in Plasma Physics 9.0 credits',
        semester: 20191,
        ...generatedStandardMemoData(true),
        ...generatedExtraHeaders(true),
        ...generatedStandardVisibility(false, true),
        ...draftsWithNoActivePublishedVer[0],
        syllabusValid: {
          validFromTerm: 20191,
          validUntilTerm: 20201,
        },
        sellingText: 'This is the best course ever',
      },
      // filledInAndInvisible: {
      //   _id: draftsWithNoActivePublishedVer[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(true),
      //   ...generatedExtraHeaders(true),
      //   ...generatedStandardVisibility(false, false),
      //   ...draftsWithNoActivePublishedVer[0]
      // }
    },
    sv: {
      freshEmpty: {},
    },
  },
}

export default memoTypes
