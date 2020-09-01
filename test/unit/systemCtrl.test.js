jest.mock('../../server/configuration', () => ({ server: {} }))
jest.mock('../../server/api', () => {})
jest.mock('../../server/adldapClient', () => {})

const systemCtrl = require('../../server/controllers/systemCtrl')

describe('Not found', () => {
  test('Gets correct error code', (done) => {
    const req = { originalUrl: 'http://localhost' }

    const next = (err) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.status).toBeDefined()
      expect(err.status).toEqual(404)
      expect(err.message).toMatch('http://localhost')
      done()
    }

    systemCtrl.notFound(req, {}, next)
  })
})
