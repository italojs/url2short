const merge = require('deepmerge')
const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { URL } = require('../../entities')

const useCase = ({ urlRepository }) => () =>
  usecase('Update URL', {
    // Input/Request metadata and validation 
    request: {
      id: Number,
      fullAddress: String,
      shortest: String,
      title: String
    },

    // Output/Response metadata
    response: URL,

    //Authorization with Audit
    // authorize: (user) => (user.canUpdateURL ? Ok() : Err()),
    authorize: () => Ok(),

    //Step description and function
    'Check if the URL is valid': step(async ctx => {
      const url = await urlRepository.findByID(parseInt(ctx.req.id))
      if(!url) return Err.notFound()
      const newURL = merge.all([ url, ctx.req ])
      ctx.url = URL.fromJSON(newURL)

      if (!ctx.url.isValid()) return Err.invalidEntity({
        message: 'The URL entity is invalid', 
        payload: { entity: 'URL' },  
        cause: ctx.url.errors
      })
      
      return Ok() 
    }),

    'Update the URL': step(async ctx => {
      // ctx.ret is the return value of a use case
      return (ctx.ret = await urlRepository.update(ctx.url)) 
    })
  })

module.exports = useCase