exports.helloWorld = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
    }),
    input: event
  };

  callback(null, response)
};
