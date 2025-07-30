const {
  getAllMemosByCourseCodeAndType: getAllMemosByCourseCodeAndTypeResponse,
  detailedInformation: detailedInformationResponse,
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
      url: '/cm/*',
      response: '',
    },
  ],
}
