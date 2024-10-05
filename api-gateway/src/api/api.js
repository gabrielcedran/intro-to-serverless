exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
            message: 'hello'
        })
    })
}