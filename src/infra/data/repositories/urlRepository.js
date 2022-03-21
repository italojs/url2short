const { URL } = require('../../../domain/entities')
const { Repository } = require('@herbsjs/herbs2mongo')

module.exports = class URLRepository extends Repository {
    constructor(connection){
        super({ 
            entity: URL,
            collection: 'url',
            ids: ['id'],  
            mongodb: connection
        })
    }
}