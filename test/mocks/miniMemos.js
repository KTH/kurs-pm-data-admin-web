const mockMiniMemos = {
  sortedPublishedForAllYears: [
    {
      //NEW
      ladokRoundIds: ['1'],
      memoCommonLangAbbr: 'sv',
      memoId: 'lskdijwc9bd06110a37607',
      memoEndPoint: 'EF111120201-1',
      memoName: 'CDATA (Startdatum 2020-03-16, Svenska)',
      semester: '20201',
      status: 'published',
      version: 1
    },
    {
      //new
      ladokRoundIds: ['2'],
      memoCommonLangAbbr: 'en',
      memoId: '15e82ef70daab3a6669eef2be',
      memoEndPoint: 'EF111120192-2',
      memoName: 'Autumn 2019-2 (Start date 26/08/2019, English)',
      semester: '20192',
      status: 'published',
      version: '1'
    },
    {
      //new
      ladokRoundIds: ['1'],
      memoCommonLangAbbr: 'en',
      memoId: 'a15e82ef70daab3a6669eef2be',
      memoEndPoint: 'EF111120192-1',
      memoName: 'Autumn 2019-2 (Start date 28/10/2019, English)',
      semester: '20192',
      status: 'published',
      version: '1'
    }
  ],
  publishedWithNoActiveDraft: [
    {
      //NEW
      ladokRoundIds: ['2'],
      memoCommonLangAbbr: 'en',
      memoId: '15e82ef70daab3a6669eef2be',
      memoEndPoint: 'EF111120192-2',
      memoName: 'Autumn 2019-2 (Start date 26/08/2019, English)',
      semester: '20192',
      status: 'published',
      version: '1'
    },
    {
      //NEW
      ladokRoundIds: ['1'],
      memoCommonLangAbbr: 'sv',
      memoId: 'lskdijwc9bd06110a37607',
      memoEndPoint: 'EF111120201-1',
      memoName: 'CDATA (Startdatum 2020-03-16, Svenska)',
      semester: '20201',
      status: 'published',
      version: 1
    }
  ],
  draftsOfPublishedMemos: [
    {
      //new
      ladokRoundIds: ['1'],
      memoCommonLangAbbr: 'en',
      memoId: 'a15e82ef70daab3a6669eef2be',
      memoEndPoint: 'EF111120192-1',
      memoName: 'Autumn 2019-2 (Start date 28/10/2019, English)',
      semester: '20192',
      status: 'draft',
      version: '2'
    }
  ],
  draftsWithNoActivePublishedVer: [
    ///new
    {
      ladokRoundIds: ['2', '3'],
      memoCommonLangAbbr: 'en',
      memoId: 'asd5e84b7ab8bbfe1d77ce0f6c9',
      memoEndPoint: 'EF111120202-2-3',
      memoName:
        'Autumn 2020-2 (Start date 24/08/2020, English), CBIOT1 m.fl. (Start date 30/10/2020, Swedish)',
      semester: '20202',
      status: 'draft',
      version: '1'
    },
    {
      ladokRoundIds: ['3'],
      memoCommonLangAbbr: 'sv',
      memoId: '5e84b7ab8sddsbbfe1d77ce0f6c9',
      memoEndPoint: 'EF111120211-3',
      memoName: 'CBIOT1 m.fl. (Startdatum 2021-03-20, Svenska)',
      semester: '20211',
      status: 'draft',
      version: '1'
    },
    {
      ladokRoundIds: ['2'],
      memoCommonLangAbbr: 'en',
      memoId: 'dfasdfasdfa',
      memoEndPoint: 'EF111120211-2',
      memoName: 'Spring 2021-2 (Start date 18/01/2021, English)',
      semester: '20211',
      status: 'draft',
      version: '1'
    }
  ]
}

export default mockMiniMemos