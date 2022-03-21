const updateURL = require('./updateURL')
const assert = require('assert')
const { URL } = require('../../entities')


describe('Update url', () => {
  const authorizedUser = { hasAccess: true }

  describe('Valid url', () => {

    it('should update url if is valid', async () => {
      // Given
      const retInjection = URL.fromJSON({ 
        id: 99,
        fullAddress: 'a text',
        shortest: 'a text',
        title: 'a text'
      })
      const injection = {
        urlRepository: new ( class URLRepository {
          async findByID(id) { return ([retInjection]) }
          async update(id) { return true }
        })
      }

      const req = {
        id: 99,
        fullAddress: 'a text',
        shortest: 'a text',
        title: 'a text'
      }

      // When
      const uc = updateURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isOk)      

    })
  })

  describe('Invalid url', () => {

    it('should not update invalid URL', async () => {
      // Given
      const injection = {}
      const req = { 
        id: true,
        fullAddress: true,
        shortest: true,
        title: true
      }

      // When
      const uc = updateURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
    })

    it('should not update non existing URL', async () => {
      // Given
      const retInjection = null
      const injection = {
        urlRepository: new ( class URLRepository {
          async findByID(id) { return (retInjection) }
          async update(id) { return true }
        })
      }

      const req = { id: 0, nickname: 'herbsUser', password: 'V&eryStr0ngP@$$' }

      // When
      const uc = updateURL(injection)()
      await uc.authorize(authorizedUser)
      const ret = await uc.run(req)

      // Then
      assert.ok(ret.isErr)
      assert.ok(ret.isNotFoundError)
    })
  })
})
