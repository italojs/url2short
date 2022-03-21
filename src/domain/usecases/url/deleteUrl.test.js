const deleteURL = require('./deleteURL')
const assert = require('assert')


describe('Delete the url', () => {
  const authorizedUser = { hasAccess: true }

  describe('Valid url', () => {

    it('should delete the url if is valid', async () => {
      // Given
      const injection = {
        urlRepository: new ( class URLRepository {
          async delete(entity) { return true }
        })
      }
      
      const req = {
        id: 99
      }

      // When
      const uc = deleteURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      

    })
  })

  describe('Invalid url', () => {

    it('should not delete the invalid URL', async () => {
      // Given
      const req = { id : '5' }

      // When
      const uc = deleteURL({})()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.deepStrictEqual(ret.err, {request :[{id:[{wrongType:"Number"}]}]})
    })
  })
})
