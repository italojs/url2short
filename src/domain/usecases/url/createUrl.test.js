const createURL = require('./createURL')
const assert = require('assert')


describe('Create url', () => {
  const authorizedUser = { hasAccess: true }

  describe('Valid url', () => {

    it('should add url if is valid', async () => {
      // Given
      const injection = {
        urlRepository: new ( class URLRepository {
          async insert(url) { return (url) }
        })
      }

      const req = {
        fullAddress: 'a text',
        shortest: 'a text',
        title: 'a text'
      }

      // When
      const uc = createURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      
      assert.strictEqual(ret.ok.isValid(), true)

    })
  })

  describe('Invalid url', () => {

    it('should not create invalid url', async () => {
      // Given
      const injection = {}

      const req = {
        fullAddress: true,
        shortest: true,
        title: true
      }

      // When
      const uc = createURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
    })
  })
})
