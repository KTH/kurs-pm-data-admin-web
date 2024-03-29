/* eslint-disable no-multi-assign */
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const nock = require('nock')
const mockery = require('mockery')
const httpMocks = require('node-mocks-http')

const mockLogger = {}
mockLogger.debug = mockLogger.info = mockLogger.error = mockLogger.warn = () => {}
mockLogger.init = () => {}

mockery.registerMock('@kth/log', mockLogger)
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false,
})

const paths = require('../mocks/apipaths.json')
const api = nock('http://localhost:3001/api/node').get('/_paths').reply(200, paths).get('/_checkAPIkey').reply(200, {})

xdescribe('Index page', () => {
  before(done => {
    require('../../server/api')
    setTimeout(() => {
      done()
    }, 500)
  })

  it('should get the index page', done => {
    api.get('/v1/data/123').reply(200, {
      id: '123',
      name: 'asdasd',
    })

    const ctrl = require('../../server/controllers/sampleCtrl')
    const { req, res } = httpMocks.createMocks()

    res.render = (view, data) => {
      expect(data).to.be.not.undefined
      done()
    }

    ctrl.getIndex(req, res, () => {})
  })
})
