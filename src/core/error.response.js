const Logger = require("../loggers/logger.log")


const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
}
const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status

        // log the error
        Logger.error(message, ['/api/v1/login', '3434939', { status }])
    }
}

class ConflictErrorResponse extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, status = StatusCode.CONFLICT) {
        super(message)
        this.status = status
    }
}

class BadErrorResponse extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, status = StatusCode.FORBIDDEN) {
        super(message)
        this.status = status
    }
}

module.exports = {
    ConflictErrorResponse,
    BadErrorResponse,
}