const { usecase, step, Ok } = require('@herbsjs/herbs')
const { URL } = require('../../entities')

const useCase = ({ urlRepository }) => () =>
  usecase('Delete the URL', {
    // Input/Request metadata and validation 
    request: {
      id: Number
    },

    // Output/Response metadata
    response: Boolean,

    //Authorization with Audit
    // authorize: (user) => (user.canDeleteURL ? Ok() : Err()),
    authorize: () => Ok(),

    'Delete the URL': step(async ctx => {
      const url = URL.fromJSON({ id: ctx.req.id })
      await urlRepository.delete(url)
      return Ok()
    })
  })

module.exports = useCase