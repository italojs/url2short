module.exports = [
    { usecase: require('./url/createURL'), tags: { group: 'URLs', type: 'create'} },
    { usecase: require('./url/updateURL'), tags: { group: 'URLs', type: 'update'} },
    { usecase: require('./url/deleteURL'), tags: { group: 'URLs', type: 'delete'} },
    { usecase: require('./url/findAllURL'), tags: { group: 'URLs', type: 'read'} },
    { usecase: require('./url/findURL'), tags: { group: 'URLs', type: 'read'} }
]