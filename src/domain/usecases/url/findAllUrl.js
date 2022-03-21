const { usecase, step, Ok } = require('@herbsjs/herbs')
const { URL } = require('../../entities')

const useCase = ({ urlRepository }) => () =>
  usecase('Find all URLs', {
    // Input/Request metadata and validation
    request: {
      limit: Number,
      offset: Number
    },

    // Output/Response metadata
    response: [URL],

    //Authorization with Audit
    authorize: () => Ok(),

    'Find and return all the URLs': step(async ctx => {
      const result = await urlRepository.findAll(ctx.req)
      
      // ctx.ret is the return value of a use case
      return (ctx.ret = result.map(url => URL.fromJSON(url)))
    })
  })

module.exports = useCase
