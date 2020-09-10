import generatedExtraHeaders from './generateExtraHeaders'
import generatedStandardVisibility from './generateStandardVisibility'
import generatedStandardMemoData from './generateStandardMemoData'
import mockMiniMemos from '../miniMemos'

const {
  draftsOfPublishedMemos,
  draftsWithNoActivePublishedVer,
  publishedWithNoActiveDraft
} = mockMiniMemos

const memoTypes = {
  PUBLISHED_WITHOUT_DRAFT: {
    en: {
      _id: publishedWithNoActiveDraft[0].memoId,
      courseCode: 'EF1111',
      ...generatedStandardMemoData(true),
      ...generatedExtraHeaders(true),
      ...generatedStandardVisibility(false, true),
      ...publishedWithNoActiveDraft[0]
    }
    // sv: publishedWithNoActiveDraft[1]
  },
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
        ...generatedStandardMemoData(true),
        ...generatedExtraHeaders(true),
        ...generatedStandardVisibility(false, true),
        ...draftsOfPublishedMemos[0]
      }
      // filledInAndInvisible: {
      //   _id: draftsOfPublishedMemos[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(true),
      //   ...generatedExtraHeaders(true),
      //   ...generatedStandardVisibility(false, false),
      //   ...draftsOfPublishedMemos[0]
      // }
    }
    // sv: {}
  },
  DRAFT_NEW_MEMO: {
    en: {
      freshEmpty: {
        _id: draftsWithNoActivePublishedVer[0].memoId,
        courseCode: 'EF1111',
        ...generatedStandardMemoData(),
        ...generatedExtraHeaders(),
        ...generatedStandardVisibility(true),
        ...draftsWithNoActivePublishedVer[0]
      }
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
      // filledInAndVisible: {
      //   _id: draftsWithNoActivePublishedVer[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(true),
      //   ...generatedExtraHeaders(true),
      //   ...generatedStandardVisibility(false, true),
      //   ...draftsWithNoActivePublishedVer[0]
      // },
      // filledInAndInvisible: {
      //   _id: draftsWithNoActivePublishedVer[0].memoId,
      //   courseCode: 'EF1111',
      //   ...generatedStandardMemoData(true),
      //   ...generatedExtraHeaders(true),
      //   ...generatedStandardVisibility(false, false),
      //   ...draftsWithNoActivePublishedVer[0]
      // }
    }
  }
}

export default memoTypes
