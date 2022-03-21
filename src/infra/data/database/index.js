const { MongoClient } = require('mongodb')

let dbInstance = null;

module.exports = {
    factory: async (config) => {
        if (dbInstance) {
            return new Promise((resolve) => resolve(dbInstance))
        }
        const client = await new MongoClient(config.database.connstr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).connect()
        dbInstance = client.db(config.database.name)
        return dbInstance
    }
}