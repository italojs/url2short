const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { URL } = require('../../entities')

const useCase = ({ urlRepository }) => () =>
  usecase('Find a URL', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
    },

    // Output/Response metadata
    response: URL,

    //Authorization with Audit
    // authorize: (user) => (user.canFindOneURL ? Ok() : Err()),
    authorize: () => Ok(),

    'Find and return the URL': step(async ctx => {
      const id = ctx.req.id
      const [result] = await urlRepository.findByID(id) 
      if (!result) return Err.notFound({ 
        message: `URL entity not found by ID: ${id}`,
        payload: { entity: 'URL', id }
      })
      
      // ctx.ret is the return value of a use case
      return (ctx.ret = URL.fromJSON(result))
    })
  })

module.exports = useCase