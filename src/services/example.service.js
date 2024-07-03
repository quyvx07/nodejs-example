const { BadErrorResponse } = require("../core/error.response")

class ExampleService {

    static example = async () => {
        throw new BadErrorResponse('error', 200)
    }
}

module.exports = ExampleService