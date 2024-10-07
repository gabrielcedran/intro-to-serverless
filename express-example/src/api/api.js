const express = require('express')
const http = require('serverless-http')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'ok'
    })
})

app.get('/api/:id', (req, res) => {
    res.json({
        message: 'ok', id: req.params.id
    })
})

exports.handler = http(app)

/** 
 * the same as:
 * 
 * const serverlessHttp = http(app)
 * 
 * console.log(serverlessHttp.toString()) // logs the function
 * 
 * exports.handler = (event, context, callback) => {
 *   return serverlessHttp(event, context, callback)
 * }
*/