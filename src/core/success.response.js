
const StatusCode = {
    OK: 200,
    CREATED: 200,
}
const ReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created',
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}, option }) {
        this.message = message || reasonStatusCode
        this.status = statusCode
        this.metadata = metadata
        this.option = option
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class Ok extends SuccessResponse {
    constructor({ message, metadata = {} }) {
        super({ message, metadata })
    }
}

class Created extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata = {} }) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

module.exports = {
    Ok,
    Created
}