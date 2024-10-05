exports.handler = async(event, context, callback) => {
    const response = {
            statusCode: 200,
            body: JSON.stringify({data: {
            id: event.pathParameters.id, name: 'clean up', status: 'open'
        }})
    }

    callback(null, response)
}