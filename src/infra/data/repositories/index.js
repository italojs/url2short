async function factory(conn) {
    return {
        urlRepository: await new (require('./urlRepository.js'))(conn)
    }
}
module.exports = factory