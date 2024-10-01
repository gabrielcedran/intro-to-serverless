exports.helloWorld = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v4.0! Your function executed successfully!',
    }),
    input: event
  };

  callback(null, response)
};
