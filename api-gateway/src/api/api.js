exports.handler = (event, context, callback) => {
    console.log("Log?")
    callback(null, {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({
            message: 'hello'
        })
    })
}