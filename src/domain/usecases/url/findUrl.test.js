const getURLById = require('./findURL')
const assert = require('assert')
const { URL } = require('../../entities')

describe('Find a url', () => {
  const authorizedUser = { hasAccess: true }

  describe('Valid scenarios', () => {

    it('should return url', async () => {
      // Given 
      const mock = {
        id: 99,
        fullAddress: 'a text',
        shortest: 'a text',
        title: 'a text'
      }

      const injection = {
        urlRepository: new ( class URLRepository {
          async  findByID(id) { return ([URL.fromJSON(mock)]) }
        })
      }

      const req = {
        id: 99
      }

      // When
      const uc = getURLById(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      
      assert.strictEqual(ret.ok.isValid(), true)
      assert.strictEqual(JSON.stringify(ret.ok), JSON.stringify({id: ret.ok.id,...mock}))
    })
  })

  describe('Error scenarios', () => {

    it('return notFoundError', async () => {
      // Given
      const injection = {
        urlRepository: new ( class URLRepository {
          async  findByID(id) { return ([]) }
        })
      }

      const req = {
        id: null
      }

      // When
      const uc = getURLById(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.ok(ret.isNotFoundError)
    })
  })
})
