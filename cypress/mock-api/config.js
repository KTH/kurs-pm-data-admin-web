const {
  getAllMemosByCourseCodeAndType: getAllMemosByCourseCodeAndTypeResponse,
  detailedInformation: detailedInformationResponse,
  getSellingTextByCourseCode: getSellingTextByCourseCodeResponse,
  imageBlobStorage: imageBlobStorageResponse,
} = require('./responses')

module.exports = {
  host: {
    address: '0.0.0.0',
    port: 3001,
  },
  paths: [
    {
      method: 'get',
      url: '/kurs-pm/_monitor',
      response: 'Response from kurs-pm _monitor',
    },
    {
      method: 'get',
      url: '/kurs-pm/_checkAPIkey',
      response: 'Response from kurs-pm _checkAPIkey',
    },
    {
      method: 'get',
      url: '/kurs-pm/_paths',
      response: { api: { getAllMemosByCourseCodeAndType: { uri: '/kurs-pm/getAllMemosByCourseCodeAndType' } } },
    },
    {
      method: 'get',
      url: '/kurs-pm/getAllMemosByCourseCodeAndType',
      response: getAllMemosByCourseCodeAndTypeResponse,
    },
    {
      method: 'get',
      url: '/kursinfo/_monitor',
      response: 'Response from kursinfo _monitor',
    },
    {
      method: 'get',
      url: '/kursinfo/_checkAPIkey',
      response: 'Response from kursinfo _checkAPIkey',
    },
    {
      method: 'get',
      url: '/kursinfo/_paths',
      response: { api: { getSellingTextByCourseCode: { uri: '/kursinfo/getSellingTextByCourseCode' } } },
    },
    {
      method: 'get',
      url: '/kursinfo/getSellingTextByCourseCode',
      response: getSellingTextByCourseCodeResponse,
    },
    {
      method: 'get',
      url: '/kursplan/_monitor',
      response: 'Response from kursplan _monitor',
    },
    {
      method: 'get',
      url: '/kursplan/_checkAPIkey',
      response: 'Response from kursplan _checkAPIkey',
    },
    {
      method: 'get',
      url: '/kursplan/_paths',
      response: { api: [] },
    },
    {
      method: 'get',
      url: '/kopps/course/*/detailedinformation',
      response: detailedInformationResponse,
    },
    {
      method: 'get',
      url: '/cm/*',
      response: '',
    },
    {
      method: 'get',
      url: '/images/*',
      response: imageBlobStorageResponse,
    },
  ],
}
