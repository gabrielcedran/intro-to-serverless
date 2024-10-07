const express = require('express')

const api = express()

api.get('/api', (req, res) => {
    res.json({
        message: 'ok'
    })
})

api.get('/api/:id', (req, res) => {
    res.json({
        message: 'ok', id: req.params.id
    })
})

module.exports = api
