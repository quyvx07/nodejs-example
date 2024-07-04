require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const logger = require("./loggers/logger.log");
const uuidv4 = require('uuid').v4;

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    req.requestId = req.headers['x-request-id'] || req.headers['X-Request-ID'] || uuidv4();
    logger.log(`input params::${req.method}`, [
        req.path,
        { requestId: req.requestId },
        req.method === 'POST' ? req.body : req.query
    ])
    next();
})

// init db

// init router
app.use('', require('./routes'))

// handling error

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    const resMessage = `${statusCode} - ${Date.now() - error.now}ms - response: ${JSON.stringify(error)}`
    logger.error(resMessage, [
        req.path,
        { requestId: req.requestId },
        {
            message: error.message || 'Internal Server Error',
        }
    ])
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app
