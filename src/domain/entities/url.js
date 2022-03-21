const { entity, field } = require('@herbsjs/herbs')

const URL =
        entity('URL', {
          id: field(Number),
          fullAddress: field(String, {
            validation: { url: true, presence: true }
          }),
          shortest: field(String),
          title: field(String),
        })

module.exports = URL
