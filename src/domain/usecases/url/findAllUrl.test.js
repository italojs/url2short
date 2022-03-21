const findAllURL = require('./findAllURL')
const assert = require('assert')

describe('Find all urls', () => {
    const authorizedUser = { hasAccess: true }

    it('should return all urls', async () => {
      // Given
      const req = { limit:0, offset:0}
      const injection = {
        urlRepository: new ( class URLRepository {
          async  findAll() { return [] }
        })
      }

      // When
      const uc = findAllURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)
    })
})
