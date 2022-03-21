const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { URL } = require('../../entities')
const puppeteer = require('puppeteer');

const useCase = ({ urlRepository, bitlyService }) => () =>
  usecase('Create URL', {
    request: {
      fullAddress: String
    },

    response: URL,
    
    authorize: () => Ok(),

    'Check if the URL is valid': step(ctx => {
      ctx.url = URL.fromJSON(ctx.req)
      ctx.url.id = Math.floor(Math.random() * 100000) // it's from template
      
      if (!ctx.url.isValid()) 
        return Err.invalidEntity({
          message: 'The URL entity is invalid', 
          payload: { entity: 'URL' },
          cause: ctx.url.errors 
        })
    }),

    'Open the url into browser': step(async ctx => {
      ctx.browser = await puppeteer.launch();
      ctx.page = await ctx.browser.newPage();
      await ctx.page.goto(ctx.url.fullAddress);
    }),

    'Get the page\s title': step( async ctx => {
      ctx.url.title = await ctx.page.title()
      await ctx.browser.close();
    }),

    'Convert long url to short url': step( async ctx => {
      const result = await bitlyService.toShort(ctx.url.fullAddress)
      if(result.isErr) return Err.unknown(result.message)
      ctx.url.shortest = result.value.link
    }),
    'Save the URL': step(async ctx => {
      return (ctx.ret = await urlRepository.insert(ctx.url)) 
    })
  })

module.exports = useCase