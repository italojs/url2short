const prettylink = require('prettylink');
const { Ok, Err } = require('@herbsjs/herbs')

class BitlyService {
    constructor({ bitlyServiceConfig: { accessKey } }){
        this.bitly = new prettylink.Bitly(accessKey);
        this.bitly.init(accessKey);
    }

    async toShort(url){
        try{
            return Ok(await this.bitly.short(url))
        } catch(err){
            return Err({ message: err.message, code: 'SOME_CODE' })
        }
    }
}

module.exports = BitlyService