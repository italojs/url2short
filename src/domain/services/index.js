module.exports = (config) => {
    return {
        bitlyService: new (require('./bitly'))(config)
    }
}