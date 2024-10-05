exports.handler = async(event, context, callback) => {
    const todos = [
        {id: 1, name: 'clean up', status: 'open'},
        {id: 1, name: 'cook', status: 'done'}
      ]

    const response = {
        statusCode: 200,
        body: JSON.stringify({data: todos})
    }

    callback(null, response)
}