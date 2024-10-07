const api = require('./api')
const supertest = require('supertest')

describe('API', () => {
    let request

    beforeEach(() => {
        request = supertest(api)
    })

    test('should get todos', done => {
        request
          .get('/api')
          .expect(200, (err, res) => {
            expect(res.body).toStrictEqual({message: "ok"})
            done()
          })
      })
})